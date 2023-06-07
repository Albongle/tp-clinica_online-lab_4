import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly alertService: AlertService
  ) {}
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userService.setUserLogger();
    if (this.userService.userLogged) {
      if (this.userService.userLogged.verified) {
        return true;
      } else {
        this.alertService.showAlert({
          icon: 'info',
          message: 'Debe verificar su correo',
          timer: 2000,
        });
      }
    }
    this.router.navigateByUrl('');
    return false;
  }
}
