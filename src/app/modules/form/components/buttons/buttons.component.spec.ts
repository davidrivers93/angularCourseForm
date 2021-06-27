import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ButtonsComponent } from './buttons.component';

describe('ButtonsComponent', () => {
  let spectator: Spectator<ButtonsComponent>;

  const createHost = createComponentFactory({
    component: ButtonsComponent,
  });

  beforeEach(() => (spectator = createHost()));

  it('Should be created', () => expect(spectator).toBeDefined());

  it('should click onNext and emit', () => {
    jest.spyOn(spectator.component.next, 'emit');

    spectator.component.onNext();

    expect(spectator.component.next.emit).toHaveBeenCalled();
  });

  it('should click onBack and emit', () => {
    jest.spyOn(spectator.component.back, 'emit');

    spectator.component.onBack();

    expect(spectator.component.back.emit).toHaveBeenCalled();
  });

  it('should click onSubmit and emit', () => {
    jest.spyOn(spectator.component.submit, 'emit');

    spectator.component.onSubmit();

    expect(spectator.component.submit.emit).toHaveBeenCalled();
  });
});
