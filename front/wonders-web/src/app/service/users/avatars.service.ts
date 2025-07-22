import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AvatarsService {
  getAvatars(seeds: string[] = ['user1', 'user2', 'user3', 'user4', 'user5']): string[] {
    return seeds.map(
      seed => `${environment.diceBearApiUrl}/adventurer/png?seed=${seed}`
    );
  }

  getRandomAvatars(count: number = 5): string[] {
    return Array.from({ length: count }, () => {
      const seed = Math.random().toString(36).substring(2, 10);
      return `${environment.diceBearApiUrl}/adventurer/png?seed=${seed}`;
    });
  }
}
