import { Directive, HostListener, Input } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { User } from '../models/users/user.model';
import { Specialist } from '../models/users/specialist.model';

@Directive({
  selector: '[appUsersEnter]',
})
export class UsersMouseEnterDirective {
  @Input() public userEnter: User;
  constructor() {}
  @HostListener('mouseenter') onMouseEnter(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    let value: string;
    if (this.userEnter.userRole === 'specialist') {
      const specialist = this.userEnter as Specialist;
      value = `Espcialista: ${specialist.speciality.description}`;
    } else {
      value = `${this.userEnter.lastName}, ${this.userEnter.name}`;
    }
    Toast.fire({
      icon: 'info',
      title: value,
    });
  }
}
