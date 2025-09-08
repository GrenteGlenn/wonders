// src/app/services/google-maps-loader.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GoogleMapsLoaderService {
  private loading?: Promise<void>;

  load(options?: { libraries?: string[]; v?: string }): Promise<void> {
    if (typeof window === 'undefined') return Promise.resolve(); // SSR safe
    if ((window as any).google?.maps) return Promise.resolve();   // déjà chargé
    if (this.loading) return this.loading;

    const params = new URLSearchParams({
      key: environment.API_GoogleMap,
      v: options?.v ?? 'weekly',
      loading: 'async',
    });
    const libs = options?.libraries ?? ['marker'];
    if (libs.length) params.set('libraries', libs.join(','));

    this.loading = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Google Maps JS failed to load'));
      document.head.appendChild(script);
    });

    return this.loading;
  }
}
