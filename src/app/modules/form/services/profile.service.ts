import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Profile } from '../models/profile.model';

type ProfileEntity = Profile & { id: number };

@Injectable()
export class ProfileService {
  private createdProfile: ProfileEntity;

  constructor(private http: HttpClient) {}

  createProfile(profile: Profile): Observable<ProfileEntity> {
    const createdProfile = {
      ...profile,
      id: Math.floor(Math.random()) * 20,
    };

    this.createdProfile = createdProfile;

    return of(createdProfile);
  }
}
