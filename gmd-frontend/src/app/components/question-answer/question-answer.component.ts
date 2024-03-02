import {
  Component,
  Directive,
  OnInit,
  ElementRef
} from '@angular/core';
import {TranslocoPipe} from '@ngneat/transloco';

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

@Component({
  selector: 'app-question-answer',
  standalone: true,
  imports: [TranslocoPipe, AutoFocus],
  templateUrl: './question-answer.component.html',
  styleUrl: './question-answer.component.css',
})
export class QuestionAnswerComponent {
  steps = new Array(2).fill(false);

  constructor() {
    setTimeout(() => {
      this.steps[0] = true;
    }, 1500);
  }
}
