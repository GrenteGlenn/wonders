import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthentificationService } from '../service/auth/authentification.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthentificationService);
  const router = inject(Router);

  const token = authService.userSubject.value;

  const isAuthRoute =
    req.url.includes('/api/auth/login') ||
    req.url.includes('/api/auth/register') ||
    req.url.includes('/api/auth/refresh');

  if (token && !isAuthRoute) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        authService.logout(); 

        const currentUrl = router.url || '/fr/home';
        const urlLang = currentUrl.split('/')[1];
        const lang = (urlLang === 'fr' || urlLang === 'en') ? urlLang : (localStorage.getItem('lang') || 'fr');

        const loginUrl = `/${lang}/login`;
        if (!router.url.startsWith(loginUrl)) {
          router.navigate([loginUrl], { queryParams: { returnUrl: currentUrl } });
        }
      }
      return throwError(() => error);
    })
  );
};


// import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { catchError, throwError } from 'rxjs';
// import { AuthentificationService } from '../service/auth/authentification.service';
// import { TranslateService } from '../service/translate/translate.service';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthentificationService);
//   const router = inject(Router);
//   const authToken = authService.userSubject.value;
//   const translateService = inject(TranslateService);

//   if (authToken) {
//     req = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${authToken}`
//       }
//     });
//   }
//   return next(req).pipe(
//     catchError((error) => {
//       if (error instanceof HttpErrorResponse && error.status === 401) {
//         router.navigate(['/', translateService.currentLang, 'login']);
//       }
//       return throwError(() => error);
//     })
//   );
// };
