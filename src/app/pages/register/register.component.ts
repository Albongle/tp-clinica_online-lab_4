import { Component } from '@angular/core';
export type RegisterOption = 'especialist' | 'patient' | 'admin';
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
  }

  protected handlerUpdateView($event: any) {
    this.showForm = $event as boolean;
  }
}
