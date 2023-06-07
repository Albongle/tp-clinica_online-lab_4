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
    this.profilesPhotos = {
      1: { fileName: '', file: '', reference: '' },
      2: { fileName: '', file: '', reference: '' },
    };
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
    });
  }

  protected async register() {
    try {
      if (this.formPatientRegister.valid) {
        await this.uploadFiles();
        const user = this.createUser();
        await this.userService.registerWithFirebase(user);
        this.alertService.showAlert({
          icon: 'success',
          message: `Registro completado con exito para ${user.lastName}, ${user.name}`,
        });
        this.formPatientRegister.reset();
      } else {
        this.alertService.showAlert({
          icon: 'error',
          message: 'Debe completar todos los campos',
        });
      }
    } catch (error: any) {
      this.alertService.showAlert({ icon: 'error', message: error.message });
    }
  }

  protected return() {
    this.showForm = !this.showForm;
    this.eventShowForm.emit(this.showForm);
  }

  protected selectFile($event: Event, index: number) {
    const target = $event.target as HTMLInputElement;
    const file = target.files?.[0];
    const profilePhoto = { file: file, fileName: index };
    this.profilesPhotos[index] = profilePhoto;
  }

  private async uploadFiles() {
    for (let index = 1; index < 3; index++) {
      this.profilesPhotos[
        index
      ].fileName = `${this.formPatientRegister.value.email}_${this.profilesPhotos[index].fileName}`;
      this.profilesPhotos[index].reference = await this.userService.uploadPhoto(
        this.profilesPhotos[index].fileName,
        this.profilesPhotos[index].file
      );
    }
  }

  private createUser() {
    return new Patient({
      ...this.formPatientRegister.value,
      profilePhoto: this.profilesPhotos[1].reference,
      profilePhotoTwo: this.profilesPhotos[2].reference,
    });
  }
}
