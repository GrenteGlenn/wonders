import { MatTableModule } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../app/service/users/users.service';
import { FetchableUser, User } from '../../app/model/User';
import { ChatService } from '../../app/service/chat/chat.service'
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormGroupDirective } from '@angular/forms';
import { find } from 'rxjs';

interface UserGroupInterface {
  id: number,
  name: number,
  users: User[]
}

interface UserTestInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  img: string | null;
  role_id: number;
  UserGroupLink: {
    user_id: number;
    user_group_id: number;
    is_owner: boolean;
    is_accepted: boolean;
    user_quiz_answer_id: number | null;
    created_at: string;
    updated_at: string;
  };
}

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatTableModule, LucideAngularModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  constructor(
    private _userService: UsersService,
    private _chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.getMe();
  }

  user_id: number | null = null;
  userGroups: any | null = null
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  colors = [
    "#FF0000", // rouge vif
    "#007BFF", // bleu électrique
    "#3EB489", // vert menthe
    "#FFF700", // jaune citron
    "#DA70D6", // violet orchidée
    "#FF7F50", // orange corail
    "#E30B5C", // rose framboise
    "#40E0D0", // turquoise
    "#2F4F4F", // gris anthracite
    "#191970", // bleu nuit
    "#808000", // vert olive
    "#8B4513", // brun chocolat
    "#E0FFFF", // cyan clair
    "#FF00FF", // magenta
    "#FFD700", // or
    "#E6E6FA", // lavande
    "#7FFFD4", // aigue-marine
    "#FFDAB9", // pêche
    "#A52A2A", // marron
    "#00FA9A"  // vert mentholé
  ];

  getMe(): void {
    this._userService.getUserInfo().subscribe({
      next: (data: FetchableUser) => {
        this.user_id = data.id;
        this.getUserGroups()
      },
      error: (error) => {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
      }
    });
  }

  userLabelColors() {
    return this.colors[Math.floor(Math.random() * this.colors.length)]
  }

  addUserToGroup(groupId: number, email: string): void {
    this._chatService.addUserToGroup({ email, groupId }).subscribe({
      next: (data) => {
        console.log(data);

      },
      error: (error) => {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
      }
    })
  }

  removeUserFromGroup(user_id: number, group_id: number): void {
    this._chatService.removeUserFromGroup(user_id, group_id).subscribe({
      next: (data) => {
        this.getUserGroups()
      },
      error: (error) => {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
      }
    })
  }

  getUserGroups(): void {
    this._chatService.getAllGroups(this.user_id as number).subscribe({
      next: (data) => {
        this.userGroups = data
        console.log(data);

      },
      error: (error) => {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
      }
    })
  }

  haveToAcceptToJoinToGroup(users: UserTestInterface[]) {
    // const user = users.filter((user) => user.id == this.user_id);
    const test = users.find((user) => user.id === this.user_id)
      if (!test?.UserGroupLink.is_accepted) {
       return true
      }
      return false
  }
}
