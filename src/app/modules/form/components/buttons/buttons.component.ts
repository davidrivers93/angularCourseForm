import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[buttons]',
  templateUrl: './buttons.component.html',
})
export class ButtonsComponent implements OnInit {
  @Input() submitDisabled = false;
  @Input() nextDisabled = false;
  @Input() backDisabled = false;
  @Input() backButtonVisible = false;
  @Input() nextButtonVisible = false;
  @Input() submitButtonVisible = false;

  @Output() submit = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onNext() {
    this.next.emit();
  }

  onBack() {
    this.back.emit();
  }

  onSubmit() {
    this.submit.emit();
  }
}
