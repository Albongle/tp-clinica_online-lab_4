import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
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
  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    await this.userService.setUserLogger();
    if (this.userService.userLogged && this.userService.userLogged.verified) {
      return true;
    }
    await this.router.navigateByUrl('');
    return false;
  }
}
