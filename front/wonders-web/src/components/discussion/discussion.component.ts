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
import { Subscription } from 'rxjs';
import { FirebaseService, Message, User } from '../../app/service/firebase/firebase.service';
import { ChatService } from '../../app/service/chat/chat.service'; // à créer si pas existant
import { UsersService } from '../../app/service/users/users.service';
import { firstValueFrom } from 'rxjs';
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
export class DiscussionComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  messages: Message[] = [];
  users: User[] = [];
  newMessage = '';
  isLoading = true;
  isSending = false;
  sidebarOpen = false;
  openQuizModal = false;

  currentUser!: any;
  currentGroup!: any;

  private subscriptions: Subscription[] = [];
  private shouldScrollToBottom = false;

  constructor(
    private firebaseService: FirebaseService,
    private discussionService: ChatService,
    private userService: UsersService,
    private route: ActivatedRoute
  ) {}

async ngOnInit() {
  try {
    const groupId = Number(this.route.snapshot.paramMap.get('id'));
    this.currentUser = await firstValueFrom(this.userService.getUserInfo());
    this.currentGroup = await firstValueFrom(
      this.discussionService.getGroupById(Number(groupId))
    );

    if (this.currentUser && this.currentGroup) {
      await this.firebaseService.initializeWithGroup(this.currentGroup, this.currentUser.id);
    }

    // Souscription aux messages et utilisateurs (temps réel)
    this.subscriptions.push(
      this.firebaseService.messages$.subscribe(messages => {
        this.messages = messages;
        this.shouldScrollToBottom = true;
      }),
      this.firebaseService.users$.subscribe(users => this.users = users)
    );

    this.isLoading = false;
  } catch (error) {
    console.error('Erreur d\'initialisation du chat:', error);
    this.isLoading = false;
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

  async sendMessage() {
    if (!this.newMessage.trim() || this.isSending) return;
    this.isSending = true;

    try {
      await this.firebaseService.sendMessage(this.newMessage.trim());
      this.newMessage = '';
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    } finally {
      this.isSending = false;
    }
  }

  isOwnMessage(message: Message): boolean {
    return message.userId === this.currentUser?.id.toString();
  }

  formatTime(timestamp: any): string {
    const date = timestamp?.toDate?.() || new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  scrollToBottom() {
    try {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

trackByMessage(index: number, message: Message) {
  return message.id || index;
}

}
