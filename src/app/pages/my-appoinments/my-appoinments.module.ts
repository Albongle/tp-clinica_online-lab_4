import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAppoinmentsRoutingModule } from './my-appoinments-routing.module';
import { MyAppoinmentsComponent } from './my-appoinments.component';


@NgModule({
  declarations: [
    MyAppoinmentsComponent
  ],
  imports: [
    CommonModule,
    MyAppoinmentsRoutingModule
  ]
})
export class MyAppoinmentsModule { }
