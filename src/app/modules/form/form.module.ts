import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ErrorComponent } from './components/error/error.component';
import { PasswordComponent } from './components/password/password.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { FormRouter } from './form-routing.module';
import { FormPageComponent } from './pages/form/form-page.component';

import { NgxsModule } from '@ngxs/store';
import { FormStore } from './store/form.store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { PersonalDataComponent } from './components/personalData/personalData.component';
import { AddressesComponent } from './components/addresses/addresses.component';

@NgModule({
  imports: [
    FormRouter,
    SharedModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([FormStore]),
  ],
  declarations: [
    ProfileFormComponent,
    FormPageComponent,
    PasswordComponent,
    ErrorComponent,
    ButtonsComponent,
    PersonalDataComponent,
    AddressesComponent,
  ],
})
export class FormModule {}
