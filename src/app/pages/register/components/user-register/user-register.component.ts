import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { RegisterOption } from '../../register.component';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnChanges {
  @Input() registerOption: RegisterOption;
  @Output() public eventShowForm: EventEmitter<boolean>;
  @Input() public showForm: boolean;
  protected image: string;
  protected title: string;
  protected formRegister: FormGroup;
  constructor(
    private readonly userService: UserService,
    private readonly alertService: AlertService,
    private readonly formBuilder: FormBuilder
  ) {
    this.eventShowForm = new EventEmitter();
    this.formRegister = this.formBuilder.group({
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
  ngOnChanges(): void {
    this.setParametersFromProfile();
    this.updateControlsFromProfile();
  }

  protected register() {
    try {
      if (this.formRegister.valid) {
        this.alertService.showAlert({
          icon: 'success',
          message: 'Registro ok',
        });
      } else {
        this.alertService.showAlert({ icon: 'error', message: 'falta' });
      }
      // this.userService.registerWithFirebase({
      //   email: 'alejandro.bongioanni@gmail.com',
      //   password: '12345678',
      // });
    } catch (error: any) {
      this.alertService.showAlert({ icon: 'error', message: error.message });
    }
  }

  protected return() {
    this.showForm = !this.showForm;
    this.eventShowForm.emit(this.showForm);
  }
  private setParametersFromProfile() {
    const baseUrl = '../../../assets/images/register/';
    switch (this.registerOption) {
      case 'admin':
        this.title = 'Administradores';
        this.image = `${baseUrl}admin.png`;
        break;

      case 'especialist':
        this.title = 'Especialistas';
        this.image = `${baseUrl}doctor.png`;
        break;

      default:
        this.title = 'Pacientes';
        this.image = `${baseUrl}paciente.png`;
    }
  }
  private updateControlsFromProfile() {
    switch (this.registerOption) {
      case 'admin':
        this.formRegister.removeControl('socialWork');
        this.formRegister.removeControl('profilePhotoTwo');
        this.formRegister.removeControl('speciality');

        break;

      case 'especialist':
        this.formRegister.removeControl('socialWork');
        this.formRegister.removeControl('profilePhotoTwo');
        this.formRegister.addControl(
          'speciality',
          new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ])
        );

        break;

      default:
        this.formRegister.removeControl('speciality');
        this.formRegister.addControl(
          'socialWork',
          new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ])
        );
        this.formRegister.addControl(
          'profilePhotoTwo',
          new FormControl('', [Validators.required])
        );
    }
  }
}
