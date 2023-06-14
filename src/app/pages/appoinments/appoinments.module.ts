import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppoinmentsRoutingModule } from './appoinments-routing.module';
import { AppoinmentsComponent } from './appoinments.component';


@NgModule({
  declarations: [
    AppoinmentsComponent
  ],
  imports: [
    CommonModule,
    AppoinmentsRoutingModule
  ]
})
export class AppoinmentsModule { }
