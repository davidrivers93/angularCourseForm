import { createHttpFactory, SpectatorHttp } from '@ngneat/spectator/jest';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let spectator: SpectatorHttp<ProfileService>;

  const createService = createHttpFactory(ProfileService);

  beforeEach(() => (spectator = createService()));

  it('should be created', () => expect(spectator.service).toBeDefined());
});
