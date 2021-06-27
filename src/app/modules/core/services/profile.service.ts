import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Profile } from '../models/profile.model';

export type ProfileEntity = Profile & { id: number };

const URL = 'https://profile-angular-course.free.beeceptor.com';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}

  createProfile(profile: Profile): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(URL, profile);
  }

  getProfile(id: number): Observable<ProfileEntity> {
    return this.http.get<ProfileEntity>(URL);
  }
}
