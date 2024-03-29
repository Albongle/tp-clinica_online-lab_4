import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientRegisterComponent } from './components/patient-register/patient-register.component';
import { EspecialistRegisterComponent } from './components/especialist-register/especialist-register.component';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import {
  RecaptchaModule,
  RecaptchaFormsModule,
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
} from 'ng-recaptcha';

@NgModule({
  declarations: [
    RegisterComponent,
    PatientRegisterComponent,
    EspecialistRegisterComponent,
    AdminRegisterComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6Lfh2IQmAAAAAJn13wYbRkpN2ARn7wStyXa4Tn7z',
      } as RecaptchaSettings,
    },
  ],
  exports: [RegisterComponent],
})
export class RegisterModule {}
