import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-chat-sidebar',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './chat-sidebar.component.html',
  styleUrl: './chat-sidebar.component.css'
})
export class ChatSidebarComponent {
  isOpen = false;

  constructor(private router: Router) {}

  onActivate() {
    this.isOpen = true;
    document.documentElement.classList.add('overflow-hidden'); // lock scroll derrière
  }
  onDeactivate() {
    this.isOpen = false;
    document.documentElement.classList.remove('overflow-hidden');
  }
  

  close() {
    // Ferme l'outlet nommé (et reste sur la page derrière)
    this.router.navigate([{ outlets: { chat: null } }]);
  }

  @HostListener('window:keydown.escape')
  onEsc() {
    if (this.isOpen) this.close();
  }
}
