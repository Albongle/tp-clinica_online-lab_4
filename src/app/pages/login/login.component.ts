import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  protected formLogin: FormGroup;
  constructor(
    private readonly alertService: AlertService,
    protected readonly userService: UserService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public async loginWithMailAndPassword() {
    try {
      const userLog = await this.userService.loginWithEmailAndPassword(
        this.formLogin.value.email,
        this.formLogin.value.password
      );
      this.alertService.showAlert({
        icon: 'success',
        message: `Bienvenido ${userLog.email}`,
      });
      this.router.navigateByUrl('');
    } catch (error: any) {
      this.alertService.showAlert({ icon: 'error', message: error.message });
    }

    this.userService.setUserLogger();
    this.formLogin.reset();
  }
}
