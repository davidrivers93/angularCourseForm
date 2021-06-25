import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { AddressComponent } from './components/address/address.component';
import { CustomInputComponent } from './components/customInput/customInput.component';
import { ControlErrorDirective } from './directives/controlError/controlError.directive';

@NgModule({
  imports: [CommonModule, InputsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    CustomInputComponent,
    AddressComponent,
    ControlErrorDirective,
  ],
  declarations: [AddressComponent, ControlErrorDirective, CustomInputComponent],
  providers: [],
})
export class SharedModule {}
