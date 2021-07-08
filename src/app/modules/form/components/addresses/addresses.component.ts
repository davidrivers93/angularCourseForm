import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import {
  FormStateModel,
  FormStore,
  SetAddressesData,
} from '../../store/form.store';

@Component({
  selector: '[addresses]',
  templateUrl: './addresses.component.html',
})
export class AddressesComponent implements OnInit {
  addresses: FormArray;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    const store: FormStateModel = this.store.selectSnapshot(FormStore);
    this.initializeAddresses(store.addresses.value);
    this.subscribeToChanges();
  }

  addItem(address: any = null): void {
    const group = this.fb.group({
      direction: [address?.direction, [Validators.required]],
      postalCode: [address?.postalCode],
      city: address?.city,
      country: address?.country,
    });
    this.addresses.push(group);
  }

  onRemoveAddress(index: number) {
    this.addresses.removeAt(index);
  }

  private initializeAddresses(addresses: any[]): void {
    this.addresses = this.fb.array([]);
    addresses.forEach((address) => {
      this.addItem(address);
    });
  }

  private subscribeToChanges() {
    this.addresses.valueChanges.subscribe((value) => {
      const valid = this.addresses.valid;
      this.store.dispatch(
        new SetAddressesData({
          value,
          valid,
        })
      );
    });
  }
}
