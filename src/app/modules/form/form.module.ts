import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../shared/shared.module';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ErrorComponent } from './components/error/error.component';
import { PasswordComponent } from './components/password/password.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { FormRouter } from './form-routing.module';
import { FormPageComponent } from './pages/form/form-page.component';
import { FormState } from './state/form.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { PersonalDataComponent } from './components/personalData/personalData.component';

@NgModule({
  imports: [
    FormRouter,
    SharedModule,
    NgxsModule.forRoot([FormState], { developmentMode: true }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  declarations: [
    ProfileFormComponent,
    FormPageComponent,
    PasswordComponent,
    ErrorComponent,
    ButtonsComponent,
    PersonalDataComponent,
  ],
})
export class FormModule {}
