import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  Self,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { Overlay } from '@angular/cdk/overlay';

import { ComponentPortal } from '@angular/cdk/portal';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Directive({ selector: '[controlError]' })
export class ControlErrorDirective implements AfterViewInit {
  componentRef: ComponentRef<ErrorMessageComponent>;
  constructor(
    @Self() private control: NgControl,
    private overlay: Overlay,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit() {
    this.subscribeToChanges();
  }

  private subscribeToChanges(): void {
    this.control.valueChanges
      .pipe(
        map(() => this.control.errors),
        filter((errors: { [key: string]: any }) => !!errors)
      )
      .subscribe((res: { [key: string]: any }) => this.setError());
  }

  private setError(): void {
    const ref = new ComponentPortal(ErrorMessageComponent);
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: 35,
        },
      ]);

    const overlayRef = this.overlay.create({
      positionStrategy,
      panelClass: ['panel--error'],
    });

    this.componentRef = overlayRef.attach(ref);
    this.componentRef.instance.msg = 'Hola2';
  }
}
