import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SetAddressesDataState } from '../../state/actions/actions.state';

@Component({
  selector: '[addresses]',
  templateUrl: './addresses.component.html',
})
export class AddressesComponent implements OnInit {
  addresses: FormArray;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.addresses = this.fb.array([]);
    this.addItem();
    this.subscribeToChanges();
  }

  addItem(): void {
    const group = this.fb.group({
      direction: ['', [Validators.required]],
      postalCode: [''],
      city: '',
      country: '',
    });
    this.addresses.push(group);
  }

  private subscribeToChanges() {
    this.addresses.valueChanges.subscribe((value) => {
      const valid = this.addresses.valid;
      this.store.dispatch(
        new SetAddressesDataState({
          value,
          valid,
        })
      );
    });
  }
}
