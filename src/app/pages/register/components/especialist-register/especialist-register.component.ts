import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Speciality } from 'src/app/models/speciality.model';
import { Specialist } from 'src/app/models/users/specialist.model';
import { AlertService } from 'src/app/services/alert.service';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-especialist-register',
  templateUrl: './especialist-register.component.html',
  styleUrls: ['./especialist-register.component.scss'],
})
export class EspecialistRegisterComponent {
  @Output() public eventShowForm: EventEmitter<boolean>;
  @Input() public showForm: boolean;
  private profilesPhotos: any;
  protected formSpecialistRegister: FormGroup;
  protected listOfSpecialities: Speciality[];
  protected showOtherSpeciality: boolean;

  constructor(
    private readonly userService: UserService,
    private readonly alertService: AlertService,
    private readonly formBuilder: FormBuilder,
    private readonly specialitiesService: SpecialitiesService
  ) {
    this.setSpecialities();
    this.profilesPhotos = {};
    this.eventShowForm = new EventEmitter();
    this.formSpecialistRegister = this.formBuilder.group({
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
      speciality: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      profilePhoto: ['', Validators.required],
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
      if (this.formSpecialistRegister.valid) {
        this.validateSpeciality();
        await this.uploadFiles();
        const user = this.createUser();
        await this.userService.registerWithFirebase(user);
        await this.alertService.showAlert({
          icon: 'success',
          message: `Registro completado con exito para ${user.lastName}, ${user.name}`,
          timer: 2000,
        });
        this.formSpecialistRegister.reset();
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
  protected selectSpeciality(value: string) {
    if (value === 'Otro') {
      this.showOtherSpeciality = true;
    } else {
      this.showOtherSpeciality = false;
    }
  }

  private validateSpeciality() {
    if (
      this.listOfSpecialities.some(
        (speciality) =>
          this.showOtherSpeciality &&
          speciality.description ===
            this.formSpecialistRegister.controls['speciality'].value
      ) ||
      this.formSpecialistRegister.controls['speciality'].value.toLowerCase() ===
        'otro'
    ) {
      throw new Error(
        'La nueva especialidad debe ser valida o no encontrase dentro del listado'
      );
    }
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
      const fileName = `${this.formSpecialistRegister.value.email}_${key}.${extension}`;
      this.formSpecialistRegister.value.profilePhoto = fileName;
      await this.userService.uploadPhoto(fileName, this.profilesPhotos[key]);
    }
  }

  private createUser() {
    const speciality = new Speciality({
      description: this.formSpecialistRegister.value.speciality,
    });
    if (this.showOtherSpeciality) {
      speciality.image = 'especialidad_default.png';
    } else {
      speciality.image = `${this.formSpecialistRegister.value.speciality}.png`;
    }
    return new Specialist({
      ...this.formSpecialistRegister.value,
      verifiedByAdmin: false,
      speciality,
    });
  }

  private async setSpecialities() {
    this.listOfSpecialities =
      await this.specialitiesService.getAllSpecialities();
  }
}
