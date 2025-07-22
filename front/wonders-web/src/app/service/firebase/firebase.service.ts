import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  where
} from 'firebase/firestore';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { UserGroupInterface, UserGroupLinkInterface } from '../../model/UserGroup';
import { FetchableUser } from '../../model/User';
import { environment } from '../../../environments/environment';
import { UsersService } from '../users/users.service';

export interface Message {
  id?: string;
  text: string;
  userId: string;
  username: string;
  groupId: string;
  timestamp: any;
  avatar?: string;
}

export interface User {
  id: string;
  first_name: string;
  email?: string;
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  users: User[];
  createdAt?: any;
}

export interface ApiGroupResponse {
  id: string;
  name: string;
  description?: string;
  users: FetchableUser[];
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firebaseConfig = environment.firebaseConfig;

  private app = initializeApp(this.firebaseConfig);
  private db = getFirestore(this.app);

  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  private groupSubject = new BehaviorSubject<Group | null>(null);
  public group$ = this.groupSubject.asObservable();

  private currentUser: FetchableUser | null = null;
  private currentGroup: Group | null = null;
  private messagesUnsubscribe: (() => void) | null = null;

  user: FetchableUser | null = null;

  constructor(
    private http: HttpClient,
    private userService: UsersService
  ) {}

  async getUser(id: number): Promise<FetchableUser> {
    try {
      return await firstValueFrom(this.userService.getUserInfoByUserID(id));
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      throw error;
    }
  }

  /**
   * Initialise le service avec un groupe spécifique
   */
  async initializeWithGroup(group: UserGroupInterface, currentUserId: number): Promise<void> {
    try {
      const groupData = group;

      const userIds = groupData.users.map((user) => user.id);
      console.log(userIds, currentUserId, groupData);
      // 3. Vérifier que l'utilisateur actuel fait partie du groupe
      if (!userIds.includes(currentUserId)) {
        throw new Error('Utilisateur non trouvé dans ce groupe');
      }

      // 4. Créer les objets User avec les IDs seulement
      const users: any = groupData.users.map((user) => {
        const u = user;
        console.log(u, groupData);

        return {
          id: u.id,
          first_name: u.is_owner,
          email: u.is_owner,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}`
        };
      });

      // 5. Créer l'objet Group
      this.currentGroup = {
        id: groupData.id!.toString(),
        name: groupData.name,
        description: '', // Pas de description dans UserGroupInterface
        users: users
      };

      // 6. Définir l'utilisateur actuel
      this.currentUser = {
        id: currentUserId,
        first_name: await (await this.getUser(currentUserId)).first_name,
        email: this.user?.email
      } as unknown as FetchableUser;

      // 7. Mettre à jour les observables
      this.usersSubject.next(users);
      this.groupSubject.next(this.currentGroup);

      // 8. Écouter les messages du groupe
      this.listenToGroupMessages(groupData.id!.toString());
    } catch (error) {
      console.error("Erreur lors de l'initialisation:", error);
      throw error;
    }
  }

  /**
   * Écoute les messages du groupe
   */
  private listenToGroupMessages(groupId: string): void {
    // Nettoyer l'ancienne écoute si elle existe
    if (this.messagesUnsubscribe) {
      this.messagesUnsubscribe();
    }

    const messagesRef = collection(this.db, 'messages');
    const q = query(messagesRef, where('groupId', '==', groupId), orderBy('timestamp', 'asc'));

    this.messagesUnsubscribe = onSnapshot(q, (snapshot) => {
      const messages: Message[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({
          id: doc.id,
          ...data,

          avatar: this.getUserAvatar(data['userId'])
        } as Message);
      });
      this.messagesSubject.next(messages);
    });
  }

  private getUserAvatar(userId: string): string {
    const user = this.currentGroup?.users.find((u) => u.id === userId);
    return user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;
  }

  async sendMessage(text: string): Promise<void> {
    if (!this.currentUser || !this.currentGroup) {
      throw new Error('Utilisateur ou groupe non initialisé');
    }

    const message: Omit<Message, 'id'> = {
      text: text.trim(),
      userId: this.currentUser.id.toString(),
      username: this.currentUser.first_name || this.currentUser.first_name,
      groupId: this.currentGroup.id,
      timestamp: serverTimestamp(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.currentUser.first_name || this.currentUser.first_name}`
    };

    await addDoc(collection(this.db, 'messages'), message);
  }

  getCurrentUser(): FetchableUser | null {
    return this.currentUser;
  }

  getCurrentGroup(): Group | null {
    return this.currentGroup;
  }

  getOnlineUsers(): User[] {
    return this.usersSubject.value;
  }

  cleanup(): void {
    if (this.messagesUnsubscribe) {
      this.messagesUnsubscribe();
    }
  }
}
