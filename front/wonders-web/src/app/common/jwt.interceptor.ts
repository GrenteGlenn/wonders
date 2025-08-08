import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { AuthentificationService } from "../service/auth/authentification.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthentificationService);
  const router = inject(Router);
  const authToken = authService.userSubject.value;

  if (authToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        router.navigate(['login']);
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
