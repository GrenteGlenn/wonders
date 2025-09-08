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
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

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
    MatSidenavModule,
    LucideAngularModule
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const groupId = Number(this.route.snapshot.paramMap.get('id'));
      this.currentUser = await firstValueFrom(this.userService.getUserInfo());
      this.currentGroup = await firstValueFrom(this.discussionService.getGroupById(groupId));

      if (this.currentUser && this.currentGroup) {
        await this.firebaseService.initializeWithGroup(this.currentGroup, this.currentUser.id);
      }

      this.subscriptions.push(
        this.firebaseService.messages$.subscribe((messages) => {
          this.messages = messages;
          this.shouldScrollToBottom = true;
        }),
        this.firebaseService.users$.subscribe((users) => (this.users = users))
      );
    } catch (error) {
      console.error("Erreur d'initialisation du chat:", error);
    } finally {
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
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.firebaseService.cleanup();
  }

  async sendMessage() {
    if (!this.newMessage.trim() || this.isSending) return;
    this.isSending = true;

    try {
      await this.firebaseService.sendMessage(this.newMessage.trim());
      this.newMessage = '';
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
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

  
  onEnter(e: KeyboardEvent | Event) {
    const evt = e as KeyboardEvent;
    if (!evt.shiftKey) {
      evt.preventDefault();
      this.sendMessage();
    }
  }

  autoGrow(e: Event) {
    const el = e.target as HTMLTextAreaElement;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 180) + 'px';
  }

  getInitials(name?: string): string {
    if (!name) return 'G';
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase() || '').join('') || 'G';
  }

  isSameDay(a: any, b: any): boolean {
    const da = (a?.toDate?.() || new Date(a)) as Date;
    const db = (b?.toDate?.() || new Date(b)) as Date;
    return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth() && da.getDate() === db.getDate();
  }

  formatDay(ts: any): string {
    const d = (ts?.toDate?.() || new Date(ts)) as Date;
    return d.toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long' });
  }

  backToList() {
    this.router.navigate([{ outlets: { chat: ['chat'] } }]);
  }
}
