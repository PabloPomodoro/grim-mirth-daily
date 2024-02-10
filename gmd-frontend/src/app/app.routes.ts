import {Routes} from '@angular/router';
import {QuestionAnswerComponent} from './components/question-answer/question-answer.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'qa', component: QuestionAnswerComponent},
  {path: 'error', component: PageNotFoundComponent},
  {path: '**', component: PageNotFoundComponent},
];
