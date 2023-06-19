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
  protected showClinicHistory: boolean;
  protected showCreateUsers: boolean;
  protected showTable: boolean;
  protected listChoseOption: UserRole;
  constructor(protected readonly userService: UserService) {
    this.showTable = true;
  }

  protected handlerUpdateView(showTable: boolean) {
    this.showTable = showTable;
  }

  protected async chooseListOption(option: UserRole) {
    this.listUsers = await this.userService.getUsersFromStore();
    this.listFiltered = this.listUsers.filter((u) => u.userRole === option);
    this.showTable = !this.showTable;
    this.listChoseOption = option;
  }

  protected activateCreateUsers() {
    this.showCreateUsers = true;
    this.showClinicHistory = false;
  }
  protected activateClinicHistory() {
    this.showClinicHistory = true;
    this.showCreateUsers = false;
  }

  return() {
    this.showCreateUsers = false;
    this.showClinicHistory = false;
  }
}
