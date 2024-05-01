import {Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
