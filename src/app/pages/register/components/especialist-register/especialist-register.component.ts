import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { SpecialitiesService } from 'src/app/services/specialities.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-especialist-register',
  templateUrl: './especialist-register.component.html',
  styleUrls: ['./especialist-register.component.scss'],
})
export class EspecialistRegisterComponent implements OnDestroy {
  @Output() public eventShowForm: EventEmitter<boolean>;
  @Input() public showForm: boolean;
  private susbcribeSpecialities: Subscription;
  protected formSpecialistRegister: FormGroup;
  protected specialities: string[];
  protected showOtherSpeciality: boolean;

  constructor(
    private readonly userService: UserService,
    private readonly alertService: AlertService,
    private readonly formBuilder: FormBuilder,
    private readonly specialitiesService: SpecialitiesService
  ) {
    this.susbcribeSpecialities = this.specialitiesService
      .getAllSpecialities()
      .subscribe(
        (specialities) =>
          (this.specialities = specialities.map((s: any) => s.description))
      );
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
    });
  }

  ngOnDestroy(): void {
    this.susbcribeSpecialities.unsubscribe();
  }

  protected register() {
    try {
      // this.userService.registerWithFirebase({
      //   email: 'alejandro.bongioanni@gmail.com',
      //   password: '12345678',
      // });
      this.alertService.showAlert({ icon: 'success', message: 'Registro ok' });
    } catch (error: any) {
      this.alertService.showAlert({ icon: 'error', message: error.message });
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
      this.specialities.some(
        (speciality) =>
          this.showOtherSpeciality &&
          speciality ===
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
}
