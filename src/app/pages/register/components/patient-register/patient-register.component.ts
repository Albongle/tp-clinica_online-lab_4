import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/models/users/patient.model';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
export type RegisterOption = 'especialist' | 'patient';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.scss'],
})
export class PatientRegisterComponent {
  @Output() public eventShowForm: EventEmitter<boolean>;
  @Input() public showForm: boolean;
  protected formPatientRegister: FormGroup;
  private profilesPhotos: any;
  constructor(
    private readonly userService: UserService,
    private readonly alertService: AlertService,
    private readonly formBuilder: FormBuilder
  ) {
    this.profilesPhotos = {};
    this.eventShowForm = new EventEmitter();
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
      recaptchaReactive: [null, Validators.required],
    });
  }

  protected async register() {
    try {
      if (this.formPatientRegister.valid) {
        await this.uploadFiles();
        const user = this.createUser();
        await this.userService.registerWithFirebase(user);
        await this.alertService.showAlert({
          icon: 'success',
          message: `Registro completado con exito para ${user.lastName}, ${user.name}`,
          timer: 2000,
        });
        this.formPatientRegister.reset();
      } else {
        await this.alertService.showAlert({
          icon: 'error',
          message: 'Debe completar todos los campos',
          timer: 2000,
        });
      }
    } catch (error: any) {
      await this.alertService.showAlert({
        icon: 'error',
        message: error.message,
        timer: 2000,
      });
    }
  }

  protected return() {
    this.showForm = !this.showForm;
    this.eventShowForm.emit(this.showForm);
  }

  protected selectFile($event: Event, index: number) {
    const target = $event.target as HTMLInputElement;
    const file = target.files?.[0];
    this.profilesPhotos[index] = file;
  }

  private async uploadFiles() {
    for (const key in this.profilesPhotos) {
      const file = this.profilesPhotos[key] as File;
      const extension = file?.name.split('.').pop();
      const fileName = `${this.formPatientRegister.value.email}_${key}.${extension}`;
      if (key === '1') {
        this.formPatientRegister.value.profilePhoto = fileName;
      } else {
        this.formPatientRegister.value.profilePhotoTwo = fileName;
      }
      await this.userService.uploadPhoto(fileName, this.profilesPhotos[key]);
    }
  }

  private createUser() {
    return new Patient({
      ...this.formPatientRegister.value,
    });
  }
}
