import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ErrorComponent } from './components/error/error.component';
import { PasswordComponent } from './components/password/password.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { FormRouter } from './form-routing.module';
import { FormPageComponent } from './form/form-page.component';
import { ProfileService } from './services/profile.service';

@NgModule({
  imports: [FormRouter, SharedModule],
  exports: [],
  declarations: [
    ProfileFormComponent,
    FormPageComponent,
    PasswordComponent,
    ErrorComponent,
    ButtonsComponent,
  ],
  providers: [ProfileService],
})
export class FormModule {}
