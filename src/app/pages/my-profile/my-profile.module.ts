import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileRoutingModule } from './my-profile-routing.module';
import { MyProfileComponent } from './my-profile.component';
import { PersonalPipesModule } from 'src/app/pipes/personal-pipes/personal-pipes.module';
import { ManageScheduleComponent } from './components/manage-schedule/manage-schedule.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MyProfileComponent, ManageScheduleComponent],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    PersonalPipesModule,
    ReactiveFormsModule,
  ],
})
export class MyProfileModule {}
