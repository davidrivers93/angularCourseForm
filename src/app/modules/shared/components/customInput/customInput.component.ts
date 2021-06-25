import { Component, Input } from '@angular/core';

@Component({
  selector: 'customInput',
  templateUrl: './customInput.component.html',
})
export class CustomInputComponent {
  @Input() disabled = false;
}
