import {
  Component,
  Directive,
  OnInit,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {TranslocoPipe} from '@ngneat/transloco';
import {User} from '../../models/user.model';
import {FormsModule} from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }
}

@Directive({
  standalone: true,
  selector: '[appStartNextStep]',
})
export class StartNextStepDirective implements OnInit {
  @Input('appStartNextStep') nextStepId!: string;
  @Output() startNextStepEvent = new EventEmitter();

  ngOnInit(): void {
    this.startNextStepEvent.emit(Number(this.nextStepId));
  }
}

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
  user: User;
  wasNameEntered = false;
  wasDateOfBirthEntered = false;

  constructor() {
    this.user = new User('', new Date());

    setTimeout(() => {
      this.steps[0] = true;
    }, 1500);
  }

  startCountdownToNextStep(nextStepNumber: number) {
    setTimeout(() => {
      this.steps[nextStepNumber] = true;
    }, 1000);
  }

  startNextStepLoadingFollowByChat(id: number, timeOut: number) {
    if (this.steps.slice(id).every((item) => !item)) {
      this.steps[id] = true;
      setTimeout(() => {
        this.steps[id] = false;
        this.steps[id + 1] = true;
      }, timeOut);
    }
  }

  validDateOfBirth(value: string) {
    return value.length > 0 && new Date(this.user.dateOfBirth) <= new Date();
  }

  gotoCalendarPage() {}

  // TODO: remove as soon as calendar page is ready
  protected readonly alert = alert;
}
