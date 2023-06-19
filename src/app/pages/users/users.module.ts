import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { RegisterModule } from '../register/register.module';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { PersonalPipesModule } from 'src/app/pipes/personal-pipes/personal-pipes.module';
import { ClinicHisttoryModule } from '../clinic-history/clinic-histtory.module';

@NgModule({
  declarations: [UsersComponent, TableUsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RegisterModule,
    PersonalPipesModule,
    ClinicHisttoryModule,
  ],
})
export class UsersModule {}
