import { Injectable } from '@angular/core';
import { TranslateService as NgxTranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private _currentLang = 'fr';

  constructor(private translate: NgxTranslateService) {
    const savedLang = localStorage.getItem('lang') || 'fr';
    this._currentLang = savedLang;
    this.translate.setDefaultLang('fr');
    this.translate.use(this._currentLang);
  }

  get currentLang(): string {
    return this._currentLang;
  }

  set currentLang(lang: string) {
    this._currentLang = lang;
    localStorage.setItem('lang', lang);

    this.translate.use(lang);
  }

  instant(key: string): string {
    return this.translate.instant(key);
  }
}
