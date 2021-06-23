import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: '[form-page]',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent {
  constructor(private profileService: ProfileService) {}

  onSubmit(profile: Profile): void {
    this.profileService
      .createProfile(profile)
      .subscribe(() => console.log('Registrado'));
  }
}
