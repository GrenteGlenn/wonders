import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { FirebaseService, Message, User } from '../../app/service/firebase/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-discussion',
  standalone: true,
   imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatBadgeModule,
    MatSidenavModule
  ],
  templateUrl: './discussion.component.html',
  styleUrl: './discussion.component.css'
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  
  messages: Message[] = [];
  users: User[] = [];
  newMessage = '';
  currentUser: User | null = null;
  currentGroup: Group | null = null;
  sidebarOpen = false;
  isLoading = true;
  isSending = false;
  
  private subscriptions: Subscription[] = [];
  private shouldScrollToBottom = false;

  // Paramètres de démonstration - à remplacer par les vrais paramètres
  private demoGroupId = 'group_123';
  private demoUserId = 'user_456';

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    try {
      // TODO: Récupérer les vrais paramètres depuis l'URL ou le contexte
      // const groupId = this.route.snapshot.paramMap.get('groupId');
      // const userId = this.getCurrentUserId(); // Votre méthode pour récupérer l'ID utilisateur

      // Pour la démo, utiliser des valeurs fixes
      await this.initializeChat(this.demoGroupId, this.demoUserId);
      
    } catch (error) {
      console.error('Erreur d\'initialisation:', error);
      this.toastr.error('Erreur lors du chargement du groupe', 'Erreur');
      this.isLoading = false;
    }
  }

  private async initializeChat(groupId: string, userId: string) {
    try {
      // Initialiser le service Firebase avec les données du groupe
      await this.firebaseService.initializeWithGroup(groupId, userId);
      
      // S'abonner aux observables
      this.subscriptions.push(
        this.firebaseService.messages$.subscribe(messages => {
          const previousCount = this.messages.length;
          this.messages = messages;
          
          // Notifier les nouveaux messages
          if (messages.length > previousCount && previousCount > 0) {
            const newMessage = messages[messages.length - 1];
            if (newMessage.userId !== this.currentUser?.id) {
              this.toastr.info(`${newMessage.username}: ${newMessage.text}`, 'Nouveau message');
            }
          }
          
          this.shouldScrollToBottom = true;
        })
      );

      this.subscriptions.push(
        this.firebaseService.users$.subscribe(users => {
          this.users = users;
        })
      );

      this.subscriptions.push(
        this.firebaseService.group$.subscribe(group => {
          this.currentGroup = group;
        })
      );

      // Récupérer l'état actuel
      this.currentUser = this.firebaseService.getCurrentUser();
      this.currentGroup = this.firebaseService.getCurrentGroup();
      
      this.isLoading = false;
      
      if (this.currentUser && this.currentGroup) {
        this.toastr.success(`Connecté au groupe "${this.currentGroup.name}"`, 'Bienvenue!');
      }

    } catch (error) {
      console.error('Erreur lors de l\'initialisation du chat:', error);
      this.isLoading = false;
      throw error;
    }
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.firebaseService.cleanup();
  }

  get onlineUsers(): User[] {
    return this.users.filter(user => user.isOnline);
  }

  async sendMessage() {
    if (!this.newMessage.trim() || this.isSending) return;

    this.isSending = true;
    try {
      await this.firebaseService.sendMessage(this.newMessage.trim());
      this.newMessage = '';
    } catch (error) {
      this.toastr.error('Erreur lors de l\'envoi du message', 'Erreur');
      console.error('Send message error:', error);
    } finally {
      this.isSending = false;
    }
  }

  isOwnMessage(message: Message): boolean {
    return message.userId === this.currentUser?.id;
  }

  formatTime(timestamp: any): string {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  formatLastSeen(lastSeen: any): string {
    if (!lastSeen) return '';
    
    const date = lastSeen.toDate ? lastSeen.toDate() : new Date(lastSeen);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins}min`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `Il y a ${diffDays}j`;
  }

  trackByMessage(index: number, message: Message): string {
    return message.id || index.toString();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  async retry() {
    this.isLoading = true;
    await this.initializeChat(this.demoGroupId, this.demoUserId);
  }

  private scrollToBottom() {
    try {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
}