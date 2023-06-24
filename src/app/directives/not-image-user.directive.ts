import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNotImageUser]',
})
export class NotimageUserDirective {
  constructor(private readonly image: ElementRef) {}

  @HostListener('error')
  onError(): void {
    this.image.nativeElement.src = '../../assets/images/user_default.png';
  }
}
