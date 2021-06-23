import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressComponent } from './components/address/address.component';
import { PasswordComponent } from './components/password/password.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { SharedModule } from './modules/shared/shared.module';
import { FormPageComponent } from './pages/form/form-page.component';
import { ProfileService } from './services/profile.service';

@NgModule({
  declarations: [
    AppComponent,
    ProfileFormComponent,
    FormPageComponent,
    AddressComponent,
    PasswordComponent,
  ],
  imports: [BrowserModule, SharedModule, AppRoutingModule, ReactiveFormsModule],
  providers: [ProfileService],
  bootstrap: [AppComponent],
})
export class AppModule {}
