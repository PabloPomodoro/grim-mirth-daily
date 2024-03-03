import {
  Component,
  Directive,
  OnInit,
  ElementRef,
  EventEmitter,
  Input,
  inject,
  Output,
  AfterViewInit,
} from '@angular/core';
import {TranslocoPipe} from '@ngneat/transloco';
import {User} from '../../models/user.model';
import {FormsModule} from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[appAutoFocus]',
})
export class AutoFocus implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }
}

@Directive({
  standalone: true,
  selector: '[appStartNextStep]',
})
export class StartNextStep implements OnInit {
  @Input('appStartNextStep') nextStepId!: string;
  @Output() startNextStepEvent = new EventEmitter();

  ngOnInit(): void {
    this.startNextStepEvent.emit(Number(this.nextStepId));
  }
}

@Component({
  selector: 'app-question-answer',
  standalone: true,
  imports: [TranslocoPipe, AutoFocus, FormsModule, StartNextStep],
  templateUrl: './question-answer.component.html',
  styleUrl: './question-answer.component.css',
})
export class QuestionAnswerComponent {
  steps = new Array(4).fill(false);
  user: User;

  constructor() {
    // empty initialization
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

  setStepId(id: number) {
    this.steps[id] = true;
    setTimeout(() => {
      this.unsetStepId(id);
      this.steps[3] = true;
    }, 1500);
  }
  unsetStepId(id: number) {
    this.steps[id] = false;
  }
}
