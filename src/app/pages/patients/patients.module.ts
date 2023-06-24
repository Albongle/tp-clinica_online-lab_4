import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { ClinicHisttoryModule } from '../clinic-history/clinic-histtory.module';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [PatientsComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    ClinicHisttoryModule,
    LoadingModule,
    ButtonModule,
  ],
})
export class PatientsModule {}
