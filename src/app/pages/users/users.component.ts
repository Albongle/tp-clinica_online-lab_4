import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User, UserRole } from 'src/app/models/users/user.model';
import { ClinicHistory } from 'src/app/models/clinic_history.model';
import { ClinicHistoryService } from 'src/app/services/clinic_history.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  protected listOfClinicHistory: ClinicHistory[];
  protected listUsers: User[];
  protected listFiltered: User[];
  protected userOption: UserRole;
  protected showClinicHistory: boolean;
  protected showCreateUsers: boolean;
  protected showTable: boolean;
  protected listChoseOption: UserRole;
  constructor(
    protected readonly userService: UserService,
    private readonly clinicHistoryService: ClinicHistoryService
  ) {
    this.setListOfUsers();
    this.setListClinicalHistory();
    this.showTable = true;
  }

  protected handlerUpdateView(showTable: boolean) {
    this.showTable = showTable;
  }

  protected async chooseListOption(option: UserRole) {
    this.userOption = option;
    this.listFiltered = this.listUsers.filter((u) => u.userRole === option);
    this.showTable = !this.showTable;
    this.listChoseOption = option;
  }

  protected async setListOfUsers() {
    this.listUsers = await this.userService.getUsersFromStore();
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

  private async setListClinicalHistory() {
    if (this.userService.userLogged?.userRole === 'admin') {
      this.listOfClinicHistory =
        await this.clinicHistoryService.getAllClinicHistory();
    }
  }

  protected downloadAllUsers() {
    this.userService.exportUsersToXls(this.listUsers, 'usuarios');
  }
}
