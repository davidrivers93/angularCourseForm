import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Profile } from '../modules/core/models/profile.model';

@Injectable()
export class ProfileService {
  constructor() {}

  createProfile(profile: Profile): Observable<Profile> {
    return of(profile);
  }
}
