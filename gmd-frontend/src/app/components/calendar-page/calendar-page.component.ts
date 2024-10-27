import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.css'
})
export class CalendarPageComponent {

  rows: number[] = Array.from({ length: 100 }, (_, i) => i + 1);
  columns: number[] = Array.from({ length: 10 }, (_, i) => i + 1);

  getRandomIndexFromArray(length: number) {
    return Math.floor(Math.random() * length);
  }

  getCheckboxClass() {
    let buttonExtension = ['primary', 'secondary', 'accent', 'success', 'warning', 'info', 'error'];

    return 'checkbox checkbox-' + buttonExtension[this.getRandomIndexFromArray(buttonExtension.length)];
  }
}
