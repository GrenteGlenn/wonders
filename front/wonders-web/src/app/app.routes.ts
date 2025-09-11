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
import { SecureSafeComponent } from '../components/secure-safe/secure-safe.component';
import { PrivacyPolicyComponent } from '../components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from '../components/terms-of-service/terms-of-service.component';
import { ChatComponent } from '../components/chat/chat.component';
import { DiscussionComponent } from '../components/discussion/discussion.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'fr/home' },
  { path: 'chat', outlet: 'chat', component: ChatComponent },
  { path: 'discussion/:id', outlet: 'chat', component: DiscussionComponent },
  {
    path: ':lang',
    children: [
      { path: 'home', component: HomePageComponent},
      { path: 'question', component: QuestionComponent, canActivate: [authGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'destination', component: DestinationsComponent },
      { path: 'activities', component: ActivitiesComponent, canActivate: [authGuard] },
      { path: 'choice-guide', component: ChoiceGuideComponent, canActivate: [authGuard] },
      { path: 'direct-planning', component: DirectPlanningComponent, canActivate: [authGuard] },
      { path: 'trip-details', component: TripDetailsComponent, canActivate: [authGuard] },
      { path: 'forum', component: ForumComponent, canActivate: [authGuard] },
      { path: 'blog/:id', component: SubjectComponent, canActivate: [authGuard] },
      { path: 'subjects/:id', component: SubjectDetailComponent, canActivate: [authGuard] },
      { path: 'destinations', component: DestinationsComponent, canActivate: [authGuard] },
      { path: 'fly', component: FlyComponent, canActivate: [authGuard] },
      { path: 'stepBody', component: StepBodyComponent, canActivate: [authGuard] },
      { path: 'activity', component: ActivitiesComponent, canActivate: [authGuard] },
      { path: 'hotel', component: HotelComponent, canActivate: [authGuard] },
      { path: 'preview', component: PreviewComponent, canActivate: [authGuard] },
      { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
      { path: 'preview', component: PreviewComponent, canActivate: [authGuard] },
      { path: 'secure-safe', component: SecureSafeComponent },
      { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
      { path: 'discussion/:id', component: DiscussionComponent, canActivate: [authGuard] },
      { path: 'discussion', component: DiscussionComponent, canActivate: [authGuard] },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'terms-of-service', component: TermsOfServiceComponent }
    ]
  }
];
