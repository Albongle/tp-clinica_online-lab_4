import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAppoinmentsRoutingModule } from './create-appoinments-routing.module';
import { CreateAppoinmentsComponent } from './create-appoinments.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateAppoinmentsComponent],
  imports: [CommonModule, CreateAppoinmentsRoutingModule, ReactiveFormsModule],
})
export class CreateAppoinmentsModule {}
