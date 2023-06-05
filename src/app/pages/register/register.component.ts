import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
export type RegisterOption = 'especialist' | 'patient';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  protected showForm: boolean;

  protected registerChosenOption: RegisterOption;
  constructor() {
    this.showForm = true;
  }

  protected chooseRegistrationOption(option: RegisterOption) {
    this.showForm = !this.showForm;
    this.registerChosenOption = option;
    console.log(this.registerChosenOption);
  }

  protected handlerUpdateView($event: any) {
    this.showForm = $event as boolean;
  }
}
