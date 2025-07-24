import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideTranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
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
  Power,
  Globe,
  ArrowLeft,
  CircleCheck,
  RefreshCw,
  Loader,
  PlaneTakeoff,
  PlaneLanding,
  Calendar,
  CalendarCheck,
  Armchair,
  Euro,
  Filter,
  GitBranch,
  Repeat,
  Check,
  ChevronUp,
  X,
  SearchX,
  Info,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Star,
  MessageSquareText,
  Eye,
  ThumbsUp,
  FileText,
  ThumbsDown,
  ChevronsUpDown,
  Hotel,
  Bug
} from 'lucide-angular';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './common/jwt.interceptor';


// Chemin des fichier de traduction
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideTranslateService(),
    provideAnimationsAsync(),
    provideToastr(),
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
        Globe,
        ArrowLeft,
        CircleCheck,
        RefreshCw,
        Loader,
        PlaneTakeoff,
        PlaneLanding,
        Calendar,
        CalendarCheck,
        Armchair,
        Euro,
        Filter,
        GitBranch,
        Repeat,
        Check,
        ChevronDown,
        ChevronUp,
        X,
        SearchX,
        Info,
        ChevronRight,
        ChevronLeft,
        Star,
        MessageSquareText,
        Eye,
        ThumbsUp,
        FileText,
        ThumbsDown,
        ChevronsUpDown,
        Hotel,
        Bug
      }),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
