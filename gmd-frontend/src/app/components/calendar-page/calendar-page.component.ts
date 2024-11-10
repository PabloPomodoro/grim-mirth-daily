import {Component} from '@angular/core';
import {NgClass} from '@angular/common';
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [
    NgClass,
    TranslocoPipe
  ],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.css'
})
export class CalendarPageComponent {

  currentDay = 666;
  checkBoxes = Array.from({ length: 100 }, (_, rowIndex) =>
    Array.from({length: 10}, (_, colIndex) => ({
      rowIndex,
      colIndex,
      cssClass: this.getCheckboxClass(),
      isChecked: this.getCheckboxIsCheck(rowIndex, colIndex)
    }))
  );

  private getRandomIndexFromArray(length: number): number {
    return Math.floor(Math.random() * length);
  }

  private getCheckboxClass(): string {
    let buttonExtension = ['primary', 'secondary', 'accent', 'success', 'warning', 'info', 'error'];

    return 'checkbox checkbox-' + buttonExtension[this.getRandomIndexFromArray(buttonExtension.length)];
  }

  private getCheckboxIsCheck(rowIndex: number, colIndex: number): boolean {
    return this.currentDay >= (rowIndex*10) + (colIndex+1);
  }
}
