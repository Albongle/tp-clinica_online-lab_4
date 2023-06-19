import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppoinmentsRoutingModule } from './appoinments-routing.module';
import { AppoinmentsComponent } from './appoinments.component';
import { PersonalPipesModule } from 'src/app/pipes/personal-pipes/personal-pipes.module';
import { CreateAppoinmentsComponent } from './components/create-appoinments/create-appoinments.component';
import { MyAppoinmentsComponent } from './components/my-appoinments/my-appoinments.component';
import { RatingModule } from 'primeng/rating';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListAppoinmentComponent } from './components/list-appoinment/list-appoinment.component';
import { TableAppoinmentsComponent } from './components/table-appoinments/table-appoinments.component';
import { SurveyAppoinmentsComponent } from './components/survey-appoinments/survey-appoinments.component';
import { CreateClinicHistoryComponent } from './components/create-clinic-history/create-clinic-history.component';
@NgModule({
  declarations: [
    AppoinmentsComponent,
    CreateAppoinmentsComponent,
    MyAppoinmentsComponent,
    ListAppoinmentComponent,
    TableAppoinmentsComponent,
    SurveyAppoinmentsComponent,
    CreateClinicHistoryComponent,
  ],
  imports: [
    CommonModule,
    AppoinmentsRoutingModule,
    PersonalPipesModule,
    RatingModule,
    LoadingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AppoinmentsModule {}
