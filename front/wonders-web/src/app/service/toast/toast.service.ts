import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning'
}

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Toast[] = [];
  private toastSubject = new BehaviorSubject<Toast[]>([]);
  private toastCounter = 0;

  constructor() {}

  getToasts(): Observable<Toast[]> {
    return this.toastSubject.asObservable();
  }

  show(message: string, type: ToastType = ToastType.SUCCESS, duration: number = 3000): void {
    const id = this.toastCounter++;
    const toast: Toast = { id, message, type, duration };

    this.toasts = [...this.toasts, toast];
    this.toastSubject.next(this.toasts);

    setTimeout(() => {
      this.removeToast(id);
    }, duration);
  }

  success(message: string, duration: number = 3000): void {
    this.show(message, ToastType.SUCCESS, duration);
  }

  error(message: string, duration: number = 3000): void {
    this.show(message, ToastType.ERROR, duration);
  }

  warning(message: string, duration: number = 3000): void {
    this.show(message, ToastType.WARNING, duration);
  }

  removeToast(id: number): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.toastSubject.next(this.toasts);
  }
}
