import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  ChevronsLeft,
  ChevronsRight,
  CircleHelp,
  Search,
  UserRound,
  Settings,
  TriangleAlert,
  CircleCheckBig,
  LogIn,
  CircleX,
  Plus,
  Users,
  Route,
  LucideAngularModule,
  Map,
  CalendarDays,
  MessageCircle,
  Plane,
  Bed,
  TreePalm,
  Shield,
  MapPin,
  MailOpen,
  Power
} from 'lucide-angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './common/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      LucideAngularModule.pick({
        ChevronsLeft,
        ChevronsRight,
        TriangleAlert,
        CircleHelp,
        Search,
        UserRound,
        Settings,
        Users,
        Route,
        Map,
        CalendarDays,
        MessageCircle,
        Plane,
        Bed,
        TreePalm,
        Shield,
        MapPin,
        MailOpen,
        Power,
        LogIn,
        Plus,
        CircleX,
        CircleCheckBig,
      })
    ),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
