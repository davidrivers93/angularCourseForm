import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Profile } from '../models/profile.model';

export type ProfileEntity = Profile & { id: number };

const PROFILE_MOCK: ProfileEntity = {
  addresses: [
    {
      city: 'Valencia',
      country: 'España',
      direction: 'Plaza del ayuntamiento 1',
      postalCode: 46006,
    },
  ],
  age: 20,
  id: 1,
  password: '12',
  name: 'David',
};

@Injectable()
export class ProfileService {
  private createdProfile = PROFILE_MOCK;

  constructor(private http: HttpClient) {}

  createProfile(profile: Profile): Observable<ProfileEntity> {
    const createdProfile = {
      ...profile,
      id: Math.floor(Math.random()) * 20,
    };

    this.createdProfile = createdProfile;

    return of(createdProfile);
  }

  getProfile(id: number): Observable<ProfileEntity> {
    return of(this.createdProfile);
  }
}
