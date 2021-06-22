import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';

@Component({
  selector: '[form-page]',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent {
  onSubmit(profile: Profile): void {
    console.log(profile);
  }
}
