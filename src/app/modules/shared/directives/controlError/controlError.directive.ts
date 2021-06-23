import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  Self,
  ViewContainerRef,
} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { filter, map, tap } from 'rxjs/operators';
import {
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';

import { ComponentPortal } from '@angular/cdk/portal';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { VALIDATORS_MESSAGES } from 'src/app/validators/messages';

@Directive({ selector: '[controlError]' })
export class ControlErrorDirective implements AfterViewInit {
  private componentRef: ComponentRef<ErrorMessageComponent>;
  private overlayRef: OverlayRef;

  constructor(
    @Self() private control: NgControl,
    private overlay: Overlay,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit() {
    this.subscribeToChanges();
    this.createOverlay();
  }

  get position(): FlexibleConnectedPositionStrategy {
    return this.overlay
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
  }

  private subscribeToChanges(): void {
    this.control.valueChanges
      .pipe(
        map(() => this.control.errors),
        tap((errors: ValidationErrors) => this.checkError(errors)),
        filter((errors: { [key: string]: any }) => !!errors),
        tap(() => this.createErrorComponent())
      )
      .subscribe((errors: { [key: string]: any }) => this.setError(errors));
  }

  private checkError(errors: ValidationErrors): void {
    if (!errors && this.componentRef) {
      this.overlayRef.detach();
      this.componentRef = null;
    }
  }

  private createOverlay() {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.position,
      panelClass: ['panel--error'],
    });
  }

  private createErrorComponent(): void {
    if (this.componentRef) {
      return;
    }

    const ref = new ComponentPortal(ErrorMessageComponent);

    this.componentRef = this.overlayRef.attach(ref);
  }

  private setError(errors: { [key: string]: any }): void {
    const [firstError] = Object.entries(errors);

    const error = VALIDATORS_MESSAGES[firstError[0]](firstError[1]);
    this.componentRef.instance.msg = error;
  }
}
