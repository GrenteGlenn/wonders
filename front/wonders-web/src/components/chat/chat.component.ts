import { MatTableModule } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../app/service/users/users.service';
import { FetchableUser, User } from '../../app/model/User';
import { ChatService } from '../../app/service/chat/chat.service'
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormGroupDirective, FormsModule, NgForm } from '@angular/forms';
import { find } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '../../app/service/translate/translate.service';

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

interface CreateGroup {
  name: string,
  user_id: number
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
  imports: [MatTableModule, LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  constructor(
    private _userService: UsersService,
    private _chatService: ChatService,
    private router: Router,
    public translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.getMe().then(
      this.getUserGroups(this.user_id as number)
    )
  }

  user_id: number | null = null;
  userGroups: any = [];
  user: FetchableUser | null = null;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  isAccepted: boolean = false;
  showGroupForm: boolean = false
  newGroupName: string = ""
  showAddUserModal: boolean = false
  guest_email: string = ""
  userGroupId: number = 0

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

  private userColorCache = new Map<string, string>();

  getMe(): any {
    this._userService.getUserInfo().subscribe({
      next: (data: FetchableUser) => {
        this.user_id = data.id;
        this.user = data
        this.getUserGroups(data.id)
      },
      error: (error) => {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
      }
    });
  }

  isUserOwner(group: any): boolean {
    return group.users.some((user: any) => {
      const isOwner = user.UserGroupLink.is_owner && user.id === this.user_id;
      console.log(isOwner, user.id, this.user_id);
      return isOwner;
    });
  }

  submitGroupForm(form: NgForm): void {

    if (!form.valid) {
      console.error("Formulaire invalide");
      return;
    }

    if (this.user && this.user.id && this.newGroupName) {
      const groupData: CreateGroup = {
        name: this.newGroupName,
        user_id: this.user.id
      };

      this._chatService.createGroup(
        groupData.name,
        groupData.user_id
      ).subscribe({
        next: (data) => {
          this.newGroupName = '';
          form.resetForm();
          this.getUserGroups(this.user_id as number);
          this.showGroupForm = false
        },
        error: (error) => {
          console.error("Erreur lors de la création du groupe:", error);
        }
      });
    } else {
      console.error("Utilisateur non défini ou nom du groupe manquant.");
    }
  }

  userLabelColors(user: any) {
    const userIdStr = user.id.toString();
    if (!this.userColorCache.has(userIdStr)) {
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.userColorCache.set(userIdStr, color);
    }
    return this.userColorCache.get(userIdStr);
  }

  addUserToGroup(): void {
    this._chatService.addUserToGroup({ email: this.guest_email, group_id: this.userGroupId }).subscribe({
      next: () => {
        this.showAddUserModal = false
        this.getUserGroups(this.user_id as number)
      },
      error: (error) => {
        this.showAddUserModal = false
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
      }
    })
  }
  showModal() {

  }

  removeUserFromGroup(group: any): void {

    const userId = group.users.find((user: FetchableUser) => user.id === this.user_id).id
    this._chatService.removeUserFromGroup(userId, Number(group.id)).subscribe({
      next: (data) => {
        this.getUserGroups(userId)
      },
      error: (error) => {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
      }
    })
  }

  getUserGroups(user_id: number): void {

    this._chatService.getAllGroups(user_id as number).subscribe({
      next: (data) => {
        this.userGroups = data;
      },
      error: (error) => {
        console.log(user_id);
        console.error("Erreur lors de la récupération de l'utilisateur:", user_id);
      }
    });
  }

  acceptGroupInvitation(group: any) {
    this._chatService.acceptToJoinToGroup({user_id: this.user?.id as number, group_id: group.id as number}).subscribe({
      next: (data) => {
        this.getUserGroups(Number(this.user?.id))
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  haveToAcceptToJoinToGroup(users: UserTestInterface[]) {
    // const user = users.filter((user) => user.id == this.user_id);
    const test = users.find((user) => user.id === this.user_id)
    if (!test?.UserGroupLink.is_accepted) {
      return true
    }

    return false
  }
  // voir retour en arrière
  goToDiscussion(groupId: number): void {
    console.log("voici l'id: ", groupId, this.translateService.currentLang)
    this.router.navigate(['/', this.translateService.currentLang, 'discussion', groupId]);
  }
}
