import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { RegisterModule } from '../register/register.module';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { PersonalPipesModule } from 'src/app/pipes/personal-pipes.module';
import { ClinicHisttoryModule } from '../clinic-history/clinic-histtory.module';
import { CardsUsersComponent } from './components/cards-users/cards-users.component';
import { LoadingModule } from 'src/app/components/loading/loading.module';

@NgModule({
  declarations: [UsersComponent, TableUsersComponent, CardsUsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RegisterModule,
    PersonalPipesModule,
    ClinicHisttoryModule,
    LoadingModule,
  ],
})
export class UsersModule {}
