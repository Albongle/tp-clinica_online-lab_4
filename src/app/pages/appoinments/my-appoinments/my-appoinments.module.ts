import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAppoinmentsRoutingModule } from './my-appoinments-routing.module';
import { MyAppoinmentsComponent } from './my-appoinments.component';
import { ListAppoinmentsComponent } from './components/list-appoinments/list-appoinments.component';
import { PersonalPipesModule } from 'src/app/pipes/personal-pipes/personal-pipes.module';

@NgModule({
  declarations: [MyAppoinmentsComponent, ListAppoinmentsComponent],
  imports: [CommonModule, MyAppoinmentsRoutingModule, PersonalPipesModule],
})
export class MyAppoinmentsModule {}
