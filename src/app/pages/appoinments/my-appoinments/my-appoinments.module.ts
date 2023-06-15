import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAppoinmentsRoutingModule } from './my-appoinments-routing.module';
import { MyAppoinmentsComponent } from './my-appoinments.component';

import { PersonalPipesModule } from 'src/app/pipes/personal-pipes/personal-pipes.module';
import { FormsModule } from '@angular/forms';
import { PatientListAppoinmentComponent } from './components/patient-list-appoinment/patient-list-appoinment.component';
import { SpecilistListAppoinmentComponent } from './components/specilist-list-appoinment/specilist-list-appoinment.component';

@NgModule({
  declarations: [
    MyAppoinmentsComponent,
    PatientListAppoinmentComponent,
    SpecilistListAppoinmentComponent,
  ],
  imports: [
    CommonModule,
    MyAppoinmentsRoutingModule,
    PersonalPipesModule,
    FormsModule,
  ],
})
export class MyAppoinmentsModule {}
