import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressComponent } from './components/address/address.component';
import { PasswordComponent } from './components/password/password.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { FormPageComponent } from './pages/form/form-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileFormComponent,
    FormPageComponent,
    AddressComponent,
    PasswordComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
