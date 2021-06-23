import { Overlay } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { ControlErrorDirective } from './directives/controlError/controlError.directive';

@NgModule({
  exports: [ControlErrorDirective],
  declarations: [ControlErrorDirective, ErrorMessageComponent],
  providers: [Overlay],
})
export class SharedModule {}
