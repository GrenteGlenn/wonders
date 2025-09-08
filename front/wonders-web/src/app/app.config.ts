import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideTranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  ChevronsLeft, ChevronsRight, CircleHelp, Search, UserRound, Settings, TriangleAlert, CircleCheckBig,
  LogIn, CircleX, Plus, Users, Route, LucideAngularModule, Map, CalendarDays, MessageCircle, Plane, Bed,
  TreePalm, Shield, MapPin, MailOpen, Power, Globe, ArrowLeft, CircleCheck, RefreshCw, Loader, PlaneTakeoff,
  PlaneLanding, Calendar, CalendarCheck, Armchair, Euro, Filter, GitBranch, Repeat, Check, ChevronUp, X,
  SearchX, Info, ChevronDown, ChevronRight, ChevronLeft, Star, MessageSquareText, Eye, ThumbsUp, FileText,
  ThumbsDown, ChevronsUpDown, Hotel, Bug, MessageSquare, LogOut, UserPlus, ListChecks, Paperclip, Smile, Send
} from 'lucide-angular';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './common/jwt.interceptor';

import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapsLoaderService } from './service/googlemap/googlemap.service';

// Loader Maps avant bootstrap
function mapsInitFactory(loader: GoogleMapsLoaderService) {
  return () => loader.load({ libraries: ['marker'], v: 'weekly' });
}

// Chemin des fichier de traduction
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideTranslateService(),
    provideAnimationsAsync(),
    provideToastr(),

    importProvidersFrom(
      GoogleMapsModule,
      LucideAngularModule.pick({
        ChevronsLeft, ChevronsRight, TriangleAlert, CircleHelp, Search, UserRound, Settings, Users, Route, Map,
        CalendarDays, MessageCircle, Plane, Bed, TreePalm, Shield, MapPin, MailOpen, Power, LogIn, Plus, CircleX,
        CircleCheckBig, Globe, ArrowLeft, CircleCheck, RefreshCw, Loader, PlaneTakeoff, PlaneLanding, Calendar,
        CalendarCheck, Armchair, Euro, Filter, GitBranch, Repeat, Check, ChevronDown, ChevronUp, X, SearchX, Info,
        ChevronRight, ChevronLeft, Star, MessageSquareText, Eye, ThumbsUp, FileText, ThumbsDown, ChevronsUpDown,
        Hotel, Bug, MessageSquare,LogOut, UserPlus, ListChecks, Paperclip, Smile, Send
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),

    // 🔒 Bloque le bootstrap jusqu'au chargement de l'API Maps
    {
      provide: APP_INITIALIZER,
      useFactory: mapsInitFactory,
      deps: [GoogleMapsLoaderService],
      multi: true
    }
  ]
};
