import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/models/users/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  protected loading: boolean;
  protected showForm: boolean;
  protected registerChosenOption: UserRole;
  constructor(protected readonly userService: UserService) {
    this.showForm = true;
    this.loading = true;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2300);
  }
  protected chooseRegistrationOption(option: UserRole) {
    this.showForm = !this.showForm;
    this.registerChosenOption = option;
  }

  protected handlerUpdateView($event: any) {
    this.showForm = $event as boolean;
  }
}
