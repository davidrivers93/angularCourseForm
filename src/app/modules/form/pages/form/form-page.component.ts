import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { withLatestFrom } from 'rxjs/operators';
import { SubmitFormAction } from '../../state/actions/submit.action';
import { FormState, FormStateModel } from '../../state/form.state';

@Component({
  selector: '[form-page]',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent {
  constructor(private store: Store, private router: Router) {}

  onSubmit(): void {
    this.store
      .dispatch(new SubmitFormAction())
      .pipe(withLatestFrom(this.store.select(FormState)))
      .subscribe({
        next: ([_, { createdId }]: [any, FormStateModel]) =>
          this.router.navigate(['profile', createdId]),
      });
  }
}
