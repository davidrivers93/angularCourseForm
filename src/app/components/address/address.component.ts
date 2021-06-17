import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: '[address]',
  templateUrl: './address.component.html',
})
export class AddressComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() index: number;

  @Output() removeAddress = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
    this.formGroup.statusChanges.subscribe((status) =>
      console.log(`Address ${this.index} status is ${status}`)
    );
  }

  removeItem() {
    this.removeAddress.emit(this.index);
  }
}
