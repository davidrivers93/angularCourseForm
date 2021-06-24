import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: '[form-page]',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent {
  constructor(private profileService: ProfileService, private router: Router) {}

  onSubmit(profile: Profile): void {
    this.profileService.createProfile(profile).subscribe({
      next: ({ id }) => this.router.navigate(['profile', id]),
    });
  }
}
