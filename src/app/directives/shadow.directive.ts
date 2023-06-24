import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShadow]',
})
export class ShadowDirective {
  constructor(
    private readonly input: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  @HostListener('focus') onFocus(): void {
    this.addShadow();
  }

  @HostListener('blur') onBlur(): void {
    this.removeShadow();
  }

  private addShadow(): void {
    this.renderer.addClass(this.input.nativeElement, 'shadow-lg');
    this.renderer.addClass(this.input.nativeElement, 'rounded');
  }

  private removeShadow(): void {
    this.renderer.removeClass(this.input.nativeElement, 'shadow-lg');
    this.renderer.removeClass(this.input.nativeElement, 'rounded');
  }
}
