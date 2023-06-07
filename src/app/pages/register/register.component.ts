import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
export type RegisterOption = 'specialist' | 'patient' | 'admin';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  protected loading: boolean;
  protected showForm: boolean;
  protected registerChosenOption: RegisterOption;
  constructor(protected readonly userService: UserService) {
    this.showForm = true;
    this.loading = true;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 2300);
  }
  protected chooseRegistrationOption(option: RegisterOption) {
    this.showForm = !this.showForm;
    this.registerChosenOption = option;
  }

  protected handlerUpdateView($event: any) {
    this.showForm = $event as boolean;
  }
}
