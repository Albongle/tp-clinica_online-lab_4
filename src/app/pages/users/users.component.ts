import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User, UserRole } from 'src/app/models/users/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  listUsers: User[];
  listFiltered: User[];
  protected showForm: boolean;
  protected listChoseOption: UserRole;
  constructor(protected readonly userService: UserService) {
    this.showForm = true;
  }

  protected handlerUpdateView($event: any) {
    this.showForm = $event as boolean;
  }

  protected async chooseListOption(option: UserRole) {
    this.listUsers = await this.userService.getUsersFromStore();
    this.listFiltered = this.listUsers.filter((u) => u.userRole === option);
    this.showForm = !this.showForm;
    this.listChoseOption = option;
  }
}
