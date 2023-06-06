import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientRegisterComponent } from './components/patient-register/patient-register.component';
import { EspecialistRegisterComponent } from './components/especialist-register/especialist-register.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

@NgModule({
  declarations: [RegisterComponent, PatientRegisterComponent, EspecialistRegisterComponent, UserRegisterComponent],
  imports: [CommonModule, RegisterRoutingModule, ReactiveFormsModule],
})
export class RegisterModule {}
