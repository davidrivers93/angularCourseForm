import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ProfileEntity,
  ProfileService,
} from '../../core/services/profile.service';

@Component({
  selector: '[profile]',
  templateUrl: './profile-page.component.html',
})
export class ProfilePageComponent implements OnInit {
  profile: ProfileEntity;
  profileId: number;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProfileId();
    this.getProfile();
  }

  goToForm() {
    this.router.navigate(['/']);
  }

  private getProfileId(): void {
    this.profileId = this.route.snapshot.params['id'];
  }

  private getProfile(): void {
    this.profileService.getProfile(this.profileId).subscribe({
      next: (profile: ProfileEntity) => (this.profile = profile),
    });
  }
}
