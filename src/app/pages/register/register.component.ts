import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private readonly userService: UserService,
    private readonly alertService: AlertService
  ) {}

  protected register() {
    try {
      this.userService.registerWithFirebase({
        email: 'alejandro.bongioanni@gmail.com',
        password: '12345678',
      });
      this.alertService.showAlert({ icon: 'success', message: 'Registro ok' });
    } catch (error: any) {
      this.alertService.showAlert({ icon: 'error', message: error.message });
    }
  }
}
