import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppoinmentRoutingModule } from './appoinment-routing.module';
import { AppoinmentComponent } from './appoinment.component';
import { TableAppoinmentComponent } from './components/table-appoinment/table-appoinment.component';
import { ManageAppoinmentComponent } from './components/manage-appoinment/manage-appoinment.component';
import { CreateAppoinmentComponent } from './components/create-appoinment/create-appoinment.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppoinmentComponent,
    TableAppoinmentComponent,
    ManageAppoinmentComponent,
    CreateAppoinmentComponent,
  ],
  imports: [CommonModule, AppoinmentRoutingModule, ReactiveFormsModule],
})
export class AppoinmentModule {}
