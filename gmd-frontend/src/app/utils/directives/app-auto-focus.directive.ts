import {Directive, ElementRef, inject, OnInit} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements OnInit {
  private elementRef = inject(ElementRef);

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }
}
