import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  listUsers: any;
  constructor(protected readonly userService: UserService) {
    this.userService
      .getUsersFromStoreMapped()
      .then((users) => (this.listUsers = users));
  }
}
