import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: '[address]',
  templateUrl: './address.component.html',
})
export class AddressComponent {
  @Input() formGroup: FormGroup;
  @Input() index: number;

  @Output() removeAddress = new EventEmitter<number>();

  removeItem() {
    this.removeAddress.emit(this.index);
  }
}
