import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  protected userForQuickAccess: User[];
  protected formLogin: FormGroup;
  protected loading: boolean;
  constructor(
    private readonly alertService: AlertService,
    protected readonly userService: UserService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.setUserForQuickAccess();
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public async loginWithMailAndPassword() {
    try {
      this.loading = true;
      const userLog = await this.userService.loginWithEmailAndPassword(
        this.formLogin.value.email,
        this.formLogin.value.password
      );
      await this.alertService.showAlert({
        icon: 'success',
        message: `Bienvenido ${userLog!.email}`,
        timer: 2000,
      });
      await this.router.navigateByUrl('');
    } catch (error: any) {
      await this.userService.logout();
      await this.alertService.showAlert({
        icon: 'error',
        message: error.message,
        timer: 2000,
      });
    }
    this.loading = false;
    this.formLogin.reset();
  }

  private async setUserForQuickAccess() {
    this.loading = true;
    const users = await this.userService.getUsersFromStore();

    const usersMapped = await Promise.all(
      users.map(async (u) => {
        u.profilePhoto = (await this.userService.getProfilePhoto(u)) as string;
        return u;
      })
    );
    this.userForQuickAccess = usersMapped;
    this.loading = false;
  }

  protected async handlerLoginQuickAccess($event: any) {
    const user: User = $event as User;
    this.formLogin.setValue({ email: user.email, password: user.password });
  }
}
