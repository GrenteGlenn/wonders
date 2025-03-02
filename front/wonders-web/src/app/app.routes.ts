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
import { DestinationComponent } from '../components/destination/destination.component';
import { FormActivitiesComponent } from '../components/form-activities/form-activities.component';
import { ChoiceGuideComponent } from '../components/choice-guide/choice-guide.component';
import { DirectPlanningComponent } from '../components/direct-planning/direct-planning.component';
import { TripDetailsComponent } from '../components/trip-details/trip-details.component';

export const routes: Routes = [
    {path: "landingPage", component: LandingPageComponent},
    {path: "home", component: HomePageComponent},
    {path: "planTrip", component: PlanTipComponent},
    {path: "question", component: QuestionComponent, canActivate: [authGuard]},
    {path: "booking", component: BookingComponent},
    {path: "profile", component: ProfileComponent, canActivate: [authGuard]},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "destination", component: DestinationComponent},
    {path: "activities", component: FormActivitiesComponent},
    {path: 'choice-guide', component: ChoiceGuideComponent},
    { path: 'direct-planning', component: DirectPlanningComponent },
    { path: 'trip-details', component: TripDetailsComponent }
];


