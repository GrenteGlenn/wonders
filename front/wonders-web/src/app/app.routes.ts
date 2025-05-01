import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { QuestionComponent } from '../components/question/question.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { authGuard } from './common/auth.guard';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ChoiceGuideComponent } from '../components/choice-guide/choice-guide.component';
import { DirectPlanningComponent } from '../components/direct-planning/direct-planning.component';
import { TripDetailsComponent } from '../components/trip-details/trip-details.component';
import { SubjectComponent } from '../components/subject/subject.component';
import { SubjectDetailComponent } from '../components/subject-detail/subject-detail.component';
import { DestinationsComponent } from '../components/destinations/destinations.component';
import { FlyComponent } from '../components/fly/fly/fly.component';
import { StepBodyComponent } from '../components/step-trip/step-body/step-body.component';
import { ActivitiesComponent } from '../components/activities/activities/activities.component';
import { HotelComponent } from '../components/hotel/hotel.component';
import { PreviewComponent } from '../components/preview/preview.component';
import { ForumComponent } from '../components/topic/forum.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'fr/home' },
  {
    path: ':lang',
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'question', component: QuestionComponent, canActivate: [authGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'destination', component: DestinationsComponent },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'choice-guide', component: ChoiceGuideComponent },
      { path: 'direct-planning', component: DirectPlanningComponent },
      { path: 'trip-details', component: TripDetailsComponent },
      { path: 'forum', component: ForumComponent},
      { path: 'blog/:id', component: SubjectComponent },
      { path: 'subjects/:id', component: SubjectDetailComponent },
      { path: 'destinations', component: DestinationsComponent },
      { path: 'fly', component: FlyComponent },
      { path: 'stepBody', component: StepBodyComponent },
      { path: 'activity', component: ActivitiesComponent },
      { path: 'hotel', component: HotelComponent },
      { path: 'preview', component: PreviewComponent }
    ]
  }
];
