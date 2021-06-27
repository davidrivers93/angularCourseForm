import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ErrorComponent } from './components/error/error.component';
import { PasswordComponent } from './components/password/password.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { FormRouter } from './form-routing.module';
import { FormPageComponent } from './pages/form/form-page.component';

@NgModule({
  imports: [FormRouter, SharedModule],
  declarations: [
    ProfileFormComponent,
    FormPageComponent,
    PasswordComponent,
    ErrorComponent,
    ButtonsComponent,
  ],
})
export class FormModule {}
