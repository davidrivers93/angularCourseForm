import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { withLatestFrom } from 'rxjs/operators';
import {
  CreateProfile,
  FormStateModel,
  FormStore,
} from '../../store/form.store';

@Component({
  selector: '[form-page]',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent {
  constructor(private store: Store, private router: Router) {}

  onSubmit(): void {
    this.store
      .dispatch(new CreateProfile())
      .pipe(withLatestFrom(this.store.select(FormStore)))
      .subscribe(([_, formStoreValue]: [any, FormStateModel]) => {
        this.router.navigate(['profile', formStoreValue.newProfileId]);
      });
  }
}
