import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ChevronsLeft, ChevronsRight, CircleHelp, Search, UserRound, Settings,Users,Route, LucideAngularModule, Map, CalendarDays, MessageCircle, Plane, Bed, TreePalm, Shield, MapPin, MailOpen } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(LucideAngularModule.pick({ ChevronsLeft, ChevronsRight, CircleHelp, Search, UserRound, Settings, Users, Route, Map, CalendarDays, MessageCircle, Plane, Bed, TreePalm, Shield, MapPin, MailOpen })), provideAnimationsAsync()]
};
