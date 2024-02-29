import {Component, inject} from '@angular/core';
import {DenoService} from '../../services/deno.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-question-answer',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './question-answer.component.html',
  styleUrl: './question-answer.component.css',
})
export class QuestionAnswerComponent {
  denoService = inject(DenoService);
  books$: Observable<string[]>;

  constructor() {
    this.books$ = this.denoService.getBooks();
  }
}
