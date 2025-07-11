import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private isNavigating = new BehaviorSubject<boolean>(false);
  isNavigating$ = this.isNavigating.asObservable();

  constructor() { }

  animateNavigation(): void {
    this.isNavigating.next(true);
    // Reset après 800ms (durée de l'animation)
    setTimeout(() => {
      this.isNavigating.next(false);
    }, 800);
  }
}