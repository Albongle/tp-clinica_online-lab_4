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
  protected showTable: boolean;
  protected listChoseOption: UserRole;
  constructor(protected readonly userService: UserService) {
    this.showTable = true;
  }

  protected handlerUpdateView($event: any) {
    this.showTable = $event as boolean;
  }

  protected async chooseListOption(option: UserRole) {
    this.listUsers = await this.userService.getUsersFromStore();
    this.listFiltered = this.listUsers.filter((u) => u.userRole === option);
    this.showTable = !this.showTable;
    this.listChoseOption = option;
  }
}
