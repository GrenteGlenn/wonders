import { Routes } from '@angular/router';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { PlanTipComponent } from '../components/plan-trip/plan-trip.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { QuestionComponent } from '../components/question/question.component';
import { BookingComponent } from '../components/booking/booking.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { authGuard } from './common/auth.guard';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ChoiceGuideComponent } from '../components/choice-guide/choice-guide.component';
import { DirectPlanningComponent } from '../components/direct-planning/direct-planning.component';
import { TripDetailsComponent } from '../components/trip-details/trip-details.component';
import { DestinationsComponent } from '../components/destinations/destinations.component';
import { FlyComponent } from '../components/fly/fly/fly.component';
import { StepBodyComponent } from '../components/step-trip/step-body/step-body.component';
import { ActivitiesComponent } from '../components/activities/activities/activities.component';
import { HotelComponent } from '../components/hotel/hotel.component';
import { PreviewComponent } from '../components/preview/preview.component';

export const routes: Routes = [
  { path: 'landingPage', component: LandingPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'planTrip', component: PlanTipComponent },
  { path: 'question', component: QuestionComponent, canActivate: [authGuard] },
  { path: 'booking', component: BookingComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'choice-guide', component: ChoiceGuideComponent },
  { path: 'direct-planning', component: DirectPlanningComponent },
  { path: 'trip-details', component: TripDetailsComponent },
  { path: 'destinations', component: DestinationsComponent},
  { path: 'fly', component: FlyComponent},
  { path: 'stepBody', component: StepBodyComponent},
  { path: 'activity', component: ActivitiesComponent},
  { path: 'hotel', component: HotelComponent},
  { path: 'preview', component:PreviewComponent}
];
