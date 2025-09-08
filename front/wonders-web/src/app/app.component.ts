import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { ToastComponent } from "../components/toast/toast.component";
import { RetourBugComponent } from "../components/retourBug/retour-bug/retour-bug.component";
import { FooterComponent } from '../components/footer/footer.component';
import { ChatSidebarComponent } from "../components/chat-sidebar/chat-sidebar/chat-sidebar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ToastComponent, FooterComponent, ChatSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wonders-web';
 
}
