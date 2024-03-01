import {Component} from '@angular/core';

@Component({
  selector: 'app-question-answer',
  standalone: true,
  imports: [],
  templateUrl: './question-answer.component.html',
  styleUrl: './question-answer.component.css',
})
export class QuestionAnswerComponent {
  steps = new Array(2).fill(false);

  constructor() {
    setTimeout(() => {
      this.steps[0] = true;
    }, 2000);
    setTimeout(() => {
      this.steps[1] = true;
    }, 4000);
  }
}
