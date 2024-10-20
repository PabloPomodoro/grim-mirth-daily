import {Component} from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {UiUser} from '../../models/ui-user.model';
import {FormsModule} from '@angular/forms';
import {AutoFocusDirective} from '../../utils/directives/app-auto-focus.directive';
import {StartNextStepDirective} from '../../utils/directives/app-start-next-step.directive';

@Component({
  selector: 'app-question-answer',
  standalone: true,
  imports: [
    TranslocoPipe,
    AutoFocusDirective,
    FormsModule,
    StartNextStepDirective,
  ],
  templateUrl: './question-answer.component.html',
  styleUrl: './question-answer.component.css',
})
export class QuestionAnswerComponent {
  steps = Array.from({length: 7}, () => false);
  user: UiUser;
  wasNameEntered = false;
  wasDateOfBirthEntered = false;

  constructor() {
    this.user = new UiUser('', '', new Date());

    setTimeout(() => {
      this.steps[0] = true;
    }, 1500);
  }

  startCountdownToNextStep(nextStepNumber: number): void {
    setTimeout(() => {
      this.steps[nextStepNumber] = true;
    }, 1000);
  }

  startNextStepLoadingFollowByChat(id: number, timeOut: number): void {
    if (this.steps.slice(id).every((item) => !item)) {
      this.steps[id] = true;
      setTimeout(() => {
        this.steps[id] = false;
        this.steps[id + 1] = true;
      }, timeOut);
    }
  }

  validDateOfBirth(value: string): boolean {
    return value.length > 0 && new Date(this.user.dateOfBirth) <= new Date();
  }

  gotoCalendarPage() {}

  // TODO: remove as soon as calendar page is ready
  protected readonly alert = alert;
}
