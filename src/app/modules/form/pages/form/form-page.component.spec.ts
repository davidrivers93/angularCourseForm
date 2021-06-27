import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { Observable, of } from 'rxjs';
import { Profile } from 'src/app/modules/core/models/profile.model';

import {
  ProfileEntity,
  ProfileService,
} from '../../../core/services/profile.service';
import { FormPageComponent } from './form-page.component';

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

describe('FormPageComponent', () => {
  let spectator: Spectator<FormPageComponent>;

  const createHost = createComponentFactory({
    component: FormPageComponent,
    providers: [mockProvider(ProfileService)],
    imports: [RouterTestingModule],
  });

  beforeEach(() => (spectator = createHost()));

  it('should be defined', () => expect(spectator.component).toBeDefined());

  it('should call to onSubmit and call to service', () => {
    const id = 1;
    const service = spectator.inject(ProfileService);
    const navigateSpy = spyOn(spectator.inject(Router), 'navigate');

    service.createProfile.and.returnValue(of({ id }));

    spectator.component.onSubmit(MOCK_PROFILE);

    expect(service.createProfile).toHaveBeenCalledWith(MOCK_PROFILE);
    expect(navigateSpy).toHaveBeenCalledWith(['profile', id]);
  });
});
