import {Routes} from '@angular/router';
import {QuestionAnswerComponent} from './components/question-answer/question-answer.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'qa', component: QuestionAnswerComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];
