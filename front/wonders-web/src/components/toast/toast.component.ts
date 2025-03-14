// toast.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Toast, ToastService } from '../../app/service/toast/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  animations: [
    trigger('fadeAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateX(20px)'
      })),
      transition('void => *', [
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate('200ms ease-in', style({
          opacity: 0,
          transform: 'translateX(20px)'
        }))
      ])
    ])
  ]

})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.getToasts().subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  dismissToast(id: number): void {
    this.toastService.removeToast(id);
  }
}