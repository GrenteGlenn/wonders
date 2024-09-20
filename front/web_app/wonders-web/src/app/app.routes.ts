import { Routes } from '@angular/router';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { PlanTipComponent } from '../components/plan-trip/plan-trip.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { QuestionComponent } from '../components/question/question.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { BookingComponent } from '../components/booking/booking.component';

export const routes: Routes = [
    {path: "landingPage", component: LandingPageComponent },
    {path: "home", component: HomePageComponent},
    {path: "planTrip", component: PlanTipComponent},
    {path: "question", component: QuestionComponent}
];


