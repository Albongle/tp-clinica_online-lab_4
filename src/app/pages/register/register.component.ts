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
  protected formPatientRegister: FormGroup;
  protected formEspecialistRegister: FormGroup;
  protected registerChosenOption: RegisterOption;
  constructor(
    private readonly userService: UserService,
    private readonly alertService: AlertService,
    private readonly formBuilder: FormBuilder
  ) {
    this.showForm = true;
    this.formPatientRegister = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      age: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      dni: [
        '',
        [
          Validators.required,
          Validators.min(1000000),
          Validators.max(99999999),
        ],
      ],
      socialWork: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      profilePhoto: ['', Validators.required],
      profilePhotoTwo: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
    this.formEspecialistRegister = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  protected register() {
    try {
      this.userService.registerWithFirebase({
        email: 'alejandro.bongioanni@gmail.com',
        password: '12345678',
      });
      this.alertService.showAlert({ icon: 'success', message: 'Registro ok' });
    } catch (error: any) {
      this.alertService.showAlert({ icon: 'error', message: error.message });
    }
  }
  protected chooseRegistrationOption(option: RegisterOption) {
    this.showForm = !this.showForm;
    this.registerChosenOption = option;
    console.log(this.registerChosenOption);
  }
  protected return($event: Event) {
    $event.preventDefault();
    this.showForm = !this.showForm;
  }
}
