import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PortalModule } from '@angular/cdk/portal';
import { FormModule } from './modules/form/form.module';
import { Overlay } from '@angular/cdk/overlay';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PortalModule,
    FormModule,
  ],
  providers: [Overlay],
  bootstrap: [AppComponent],
})
export class AppModule {}
