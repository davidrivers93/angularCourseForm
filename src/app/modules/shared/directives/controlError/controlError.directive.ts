import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Optional,
  Self,
} from '@angular/core';
import {
  FormGroupDirective,
  NgControl,
  ValidationErrors,
} from '@angular/forms';
import { filter, map, tap } from 'rxjs/operators';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

import { ComponentPortal } from '@angular/cdk/portal';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { Observable } from 'rxjs';
import { VALIDATORS_MESSAGES } from 'src/app/modules/form/validators/messages';

@Directive({ selector: '[controlError]' })
export class ControlErrorDirective implements AfterViewInit {
  private componentRef: ComponentRef<ErrorMessageComponent>;
  private overlayRef: OverlayRef;

  @HostListener('focus') focus(): void {
    this.showError();
  }

  @HostListener('blur') blur(): void {
    this.hideMessage();
  }

  constructor(
    @Self() @Optional() private control: NgControl,
    @Self() @Optional() private group: FormGroupDirective,
    private overlay: Overlay,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit() {
    this.subscribeToChanges();
  }

  private getSubscriber(): Observable<any> {
    return this.getControl().valueChanges;
  }

  private getControl() {
    return this.control || this.group;
  }

  private getErrors(): ValidationErrors {
    return this.control?.errors || this.group?.errors;
  }

  private showError(): void {
    const errors = this.getControl().errors;

    if (!errors) {
      return;
    }

    this.createErrorComponent();
    this.setError(errors);
    this.setErrorClass();
  }

  private subscribeToChanges(): void {
    this.getSubscriber()
      .pipe(
        map(() => this.getErrors()),
        tap((errors: ValidationErrors) => this.checkError(errors)),
        filter((errors: ValidationErrors) => !!errors)
      )
      .subscribe((errors: ValidationErrors) => {
        this.createErrorComponent();
        this.setError(errors);
        this.setErrorClass();
      });
  }

  private checkError(errors: ValidationErrors): void {
    if (!errors && this.componentRef) {
      this.hideMessage();
      this.removeErrorClass();
    }
  }

  private setErrorClass() {
    this.elementRef.nativeElement.classList.add('form--error');
  }

  private removeErrorClass() {
    this.elementRef.nativeElement.classList.remove('form--error');
  }

  private hideMessage() {
    this.overlayRef?.detach();
    this.componentRef = null;
  }

  private createOverlay() {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: 0,
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      panelClass: ['panel--error'],
    });
  }

  private createErrorComponent(): void {
    if (this.componentRef) {
      return;
    }

    this.createOverlay();

    const ref = new ComponentPortal(ErrorMessageComponent);

    this.componentRef = this.overlayRef.attach(ref);
  }

  private setError(errors: ValidationErrors): void {
    const [firstError] = Object.entries(errors);

    const error = VALIDATORS_MESSAGES[firstError[0]](firstError[1]);
    this.componentRef.instance.msg = error;
  }
}
