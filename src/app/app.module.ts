import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PortalModule } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import { CoreModule } from './modules/core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PortalModule,
    CoreModule,
  ],
  providers: [Overlay],
  bootstrap: [AppComponent],
})
export class AppModule {}
