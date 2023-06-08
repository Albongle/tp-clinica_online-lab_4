import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User, UserRole } from 'src/app/models/users/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
})
export class TableUsersComponent {
  @Input() public list: User[];
  @Input() public roleOption: UserRole;
  @Output() public eventSendUser: EventEmitter<User>;
  @Output() public eventShowForm: EventEmitter<boolean>;
  @Input() public showForm: boolean;

  constructor(
    protected readonly userService: UserService,
    private readonly alertService: AlertService
  ) {
    this.eventSendUser = new EventEmitter();
    this.eventShowForm = new EventEmitter();
    this.showForm = true;
  }

  protected return() {
    this.showForm = !this.showForm;
    this.eventShowForm.emit(this.showForm);
  }

  protected async validateSpecialist(user: User) {
    console.log(user);
    try {
      const result = await this.userService.authorizeSpecialistByAdmin(user);
      if (result) {
        this.alertService.showAlert({
          icon: 'success',
          message: 'Usuario authorizado con exito',
        });
      }
    } catch (error: any) {
      this.alertService.showAlert({ icon: 'error', message: error.message });
    }
  }
}
