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
  doc,
  setDoc,
  updateDoc,
  where,
  getDocs
} from 'firebase/firestore';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, firstValueFrom } from 'rxjs';

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
  username: string;
  email?: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: any;
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
  users: {
    id: string;
    username: string;
    email?: string;
    // autres propriétés utilisateur de votre API
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private firebaseConfig = {
    // Remplacez par votre vraie configuration Firebase
    apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdefghijklmnop"
  };

  private app = initializeApp(this.firebaseConfig);
  private db = getFirestore(this.app);
  
  // Observables pour les données
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();
  
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();
  
  private groupSubject = new BehaviorSubject<Group | null>(null);
  public group$ = this.groupSubject.asObservable();

  // État actuel
  private currentUser: User | null = null;
  private currentGroup: Group | null = null;
  private messagesUnsubscribe: (() => void) | null = null;

  // Configuration API
  private apiBaseUrl = 'https://your-api-domain.com/api'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) {}

  /**
   * Initialise le service avec un groupe spécifique
   */
  async initializeWithGroup(groupId: string, currentUserId: string): Promise<void> {
    try {
      // 1. Récupérer les données du groupe depuis votre API
      const groupData = await this.fetchGroupFromApi(groupId);
      
      // 2. Identifier l'utilisateur actuel
      const currentUserData = groupData.users.find(u => u.id === currentUserId);
      if (!currentUserData) {
        throw new Error('Utilisateur non trouvé dans ce groupe');
      }

      // 3. Créer les objets User avec avatars
      const users: User[] = groupData.users.map(apiUser => ({
        id: apiUser.id,
        username: apiUser.username,
        email: apiUser.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${apiUser.username}`,
        isOnline: false, // Sera mis à jour par Firebase
        lastSeen: null
      }));

      // 4. Créer l'objet Group
      this.currentGroup = {
        id: groupData.id,
        name: groupData.name,
        description: groupData.description,
        users: users
      };

      // 5. Définir l'utilisateur actuel
      this.currentUser = users.find(u => u.id === currentUserId) || null;

      // 6. Mettre à jour les observables
      this.usersSubject.next(users);
      this.groupSubject.next(this.currentGroup);

      // 7. Marquer l'utilisateur comme en ligne dans Firebase
      if (this.currentUser) {
        await this.setUserOnline(this.currentUser);
      }

      // 8. Écouter les messages du groupe
      this.listenToGroupMessages(groupId);

      // 9. Écouter les statuts des utilisateurs
      this.listenToUsersStatus();

      // 10. Gérer la déconnexion
      this.setupDisconnectionHandlers();

    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      throw error;
    }
  }

  /**
   * Récupère les données du groupe depuis votre API
   */
  private async fetchGroupFromApi(groupId: string): Promise<ApiGroupResponse> {
    try {
      const response = await firstValueFrom(
        this.http.get<ApiGroupResponse>(`${this.apiBaseUrl}/groups/${groupId}/users`)
      );
      return response;
    } catch (error) {
      console.error('Erreur API:', error);
      throw new Error('Impossible de récupérer les données du groupe');
    }
  }

  /**
   * Marque l'utilisateur comme en ligne
   */
  private async setUserOnline(user: User): Promise<void> {
    const userRef = doc(this.db, 'users', user.id);
    await setDoc(userRef, {
      ...user,
      isOnline: true,
      lastSeen: serverTimestamp()
    }, { merge: true });
  }

  /**
   * Marque l'utilisateur comme hors ligne
   */
  async setUserOffline(): Promise<void> {
    if (this.currentUser) {
      const userRef = doc(this.db, 'users', this.currentUser.id);
      await updateDoc(userRef, {
        isOnline: false,
        lastSeen: serverTimestamp()
      });
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
    const q = query(
      messagesRef,
      where('groupId', '==', groupId),
      orderBy('timestamp', 'asc')
    );
    
    this.messagesUnsubscribe = onSnapshot(q, (snapshot) => {
      const messages: Message[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        messages.push({ 
          id: doc.id, 
          ...data,
          // Ajouter l'avatar depuis les données utilisateur
          avatar: this.getUserAvatar(data['userId'])
        } as Message);
      });
      this.messagesSubject.next(messages);
    });
  }

  /**
   * Écoute les statuts des utilisateurs du groupe
   */
  private listenToUsersStatus(): void {
    if (!this.currentGroup) return;

    const userIds = this.currentGroup.users.map(u => u.id);
    
    // Écouter chaque utilisateur individuellement
    userIds.forEach(userId => {
      const userRef = doc(this.db, 'users', userId);
      onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data() as User;
          this.updateUserStatus(userId, userData.isOnline, userData.lastSeen);
        }
      });
    });
  }

  /**
   * Met à jour le statut d'un utilisateur
   */
  private updateUserStatus(userId: string, isOnline: boolean, lastSeen: any): void {
    const currentUsers = this.usersSubject.value;
    const updatedUsers = currentUsers.map(user => 
      user.id === userId 
        ? { ...user, isOnline, lastSeen }
        : user
    );
    this.usersSubject.next(updatedUsers);
  }

  /**
   * Récupère l'avatar d'un utilisateur
   */
  private getUserAvatar(userId: string): string {
    const user = this.currentGroup?.users.find(u => u.id === userId);
    return user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`;
  }

  /**
   * Envoie un message
   */
  async sendMessage(text: string): Promise<void> {
    if (!this.currentUser || !this.currentGroup) {
      throw new Error('Utilisateur ou groupe non initialisé');
    }

    const message: Omit<Message, 'id'> = {
      text: text.trim(),
      userId: this.currentUser.id,
      username: this.currentUser.username,
      groupId: this.currentGroup.id,
      timestamp: serverTimestamp(),
      avatar: this.currentUser.avatar
    };

    await addDoc(collection(this.db, 'messages'), message);
  }

  /**
   * Configure les gestionnaires de déconnexion
   */
  private setupDisconnectionHandlers(): void {
    // Déconnexion lors de la fermeture de la page
    window.addEventListener('beforeunload', () => {
      this.setUserOffline();
    });

    // Déconnexion lors de la perte de focus prolongée
    let isPageVisible = true;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && isPageVisible) {
        isPageVisible = false;
        // Attendre 5 minutes avant de marquer comme hors ligne
        setTimeout(() => {
          if (!isPageVisible) {
            this.setUserOffline();
          }
        }, 300000); // 5 minutes
      } else if (!document.hidden) {
        isPageVisible = true;
        if (this.currentUser) {
          this.setUserOnline(this.currentUser);
        }
      }
    });
  }

  /**
   * Getters pour l'état actuel
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentGroup(): Group | null {
    return this.currentGroup;
  }

  getOnlineUsers(): User[] {
    return this.usersSubject.value.filter(user => user.isOnline);
  }

  /**
   * Nettoie les ressources
   */
  cleanup(): void {
    if (this.messagesUnsubscribe) {
      this.messagesUnsubscribe();
    }
    this.setUserOffline();
  }
}