import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator/jest';
import { Profile } from '../models/profile.model';

import { ProfileService } from './profile.service';

const MOCK_PROFILE: Profile = {
  addresses: [
    {
      city: 'Valencia',
      country: 'España',
      direction: 'Plaza del ayuntamiento',
      postalCode: 46006,
    },
  ],
  age: 12,
  name: 'David',
  password: '12',
};

const BASE_URL = 'https://profile-angular-course.free.beeceptor.com';

describe('ProfileService', () => {
  let spectator: SpectatorHttp<ProfileService>;

  const createService = createHttpFactory(ProfileService);

  beforeEach(() => (spectator = createService()));

  it('should be created', () => expect(spectator.service).toBeDefined());

  describe('createProfile', () => {
    it('should call to the backend', () => {
      spectator.service.createProfile(MOCK_PROFILE).subscribe();

      const reqUrl = `${BASE_URL}`;

      const req = spectator.expectOne(reqUrl, HttpMethod.POST);
      expect(req.request.url).toBe(BASE_URL);

      req.flush({ id: 10 });
    });
  });

  describe('getProfile', () => {
    it('should call to the backend', () => {
      const id = 1;
      spectator.service.getProfile(id).subscribe();

      const reqUrl = `${BASE_URL}`;

      const req = spectator.expectOne(reqUrl, HttpMethod.GET);
      expect(req.request.url).toBe(BASE_URL);

      req.flush({ id: 10, ...MOCK_PROFILE });
    });
  });
});
