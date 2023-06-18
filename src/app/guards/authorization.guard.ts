import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '../services/user.service';
import { Specialist } from '../models/users/specialist.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}
  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (this.userService.userLogged) {
      switch (this.userService.userLogged.userRole) {
        case 'admin':
          return true;
        case 'specialist':
          if (
            this.userService.userLogged.verified &&
            (this.userService.userLogged as Specialist).verifiedByAdmin
          ) {
            return true;
          }
          break;
        default:
          if (this.userService.userLogged.verified) {
            return true;
          }
      }
    }
    return false;
  }
}
