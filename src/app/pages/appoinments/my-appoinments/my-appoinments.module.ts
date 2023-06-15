import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAppoinmentsRoutingModule } from './my-appoinments-routing.module';
import { MyAppoinmentsComponent } from './my-appoinments.component';
import { PersonalPipesModule } from 'src/app/pipes/personal-pipes/personal-pipes.module';
import { FormsModule } from '@angular/forms';
import { ListAppoinmentComponent } from './components/list-appoinment/list-appoinment.component';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { TableAppoinmentsComponent } from './components/table-appoinments/table-appoinments.component';

@NgModule({
  declarations: [MyAppoinmentsComponent, ListAppoinmentComponent, TableAppoinmentsComponent],
  imports: [
    CommonModule,
    MyAppoinmentsRoutingModule,
    PersonalPipesModule,
    FormsModule,
    LoadingModule,
  ],
})
export class MyAppoinmentsModule {}
