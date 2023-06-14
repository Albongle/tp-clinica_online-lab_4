import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppoinmentsRoutingModule } from './appoinments-routing.module';
import { AppoinmentsComponent } from './appoinments.component';
import { PersonalPipesModule } from 'src/app/pipes/personal-pipes/personal-pipes.module';

@NgModule({
  declarations: [AppoinmentsComponent],
  imports: [CommonModule, AppoinmentsRoutingModule, PersonalPipesModule],
})
export class AppoinmentsModule {}
