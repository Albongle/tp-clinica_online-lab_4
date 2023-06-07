import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public async showAlert(config: {
    icon: SweetAlertIcon;
    message: string;
    timer?: number;
  }) {
    await Swal.fire({
      position: 'center',
      icon: config.icon,
      title: config.message,
      showConfirmButton: false,
      timer: config.timer ?? 1500,
    });
  }
}
