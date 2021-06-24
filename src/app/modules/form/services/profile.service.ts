import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}

  createProfile(profile): Observable<any> {
    //return this.http.post(profile)
    return of(profile);
  }
}
