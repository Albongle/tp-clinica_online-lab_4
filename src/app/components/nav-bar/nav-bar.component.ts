import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  protected name: string;
  protected imgDefault: string;
  constructor(protected readonly userService: UserService) {
    this.imgDefault = '../../../assets/images/user_default.png';
  }

  protected signOut() {
    this.userService.logout();
  }
}
