import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
<<<<<<< HEAD
import { ChevronsLeft, ChevronsRight, CircleHelp, Search, UserRound, Settings,Users,Route, LucideAngularModule, Map, CalendarDays, MessageCircle, Plane, Bed, TreePalm, Shield } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(), 
    importProvidersFrom(LucideAngularModule.pick({ ChevronsLeft, ChevronsRight, CircleHelp, Search, UserRound, Settings, Users, Route, Map, CalendarDays, MessageCircle, Plane, Bed, TreePalm, Shield })), provideAnimationsAsync()]
  
=======
import {  ChevronsLeft, ChevronsRight, CircleHelp, Search, UserRound, Settings,Users,Route, LucideAngularModule, MapPin, MailOpen } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(LucideAngularModule.pick({ ChevronsLeft, ChevronsRight, CircleHelp, Search, UserRound, Settings, Users, Route, MapPin, MailOpen }))]

>>>>>>> 6e68cba0 (feat(page): add profile page)
};
