import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { ClinicHisttoryModule } from '../clinic-history/clinic-histtory.module';

@NgModule({
  declarations: [PatientsComponent],
  imports: [CommonModule, PatientsRoutingModule, ClinicHisttoryModule],
})
export class PatientsModule {}
