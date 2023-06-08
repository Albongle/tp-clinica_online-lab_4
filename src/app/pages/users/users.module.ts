import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { RegisterModule } from '../register/register.module';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { KeysMappedPipe } from 'src/app/pipes/keys-names.pipe';
import { SpecialistPipe } from 'src/app/pipes/specialist.pipe';

@NgModule({
  declarations: [
    UsersComponent,
    TableUsersComponent,
    KeysMappedPipe,
    SpecialistPipe,
  ],
  imports: [CommonModule, UsersRoutingModule, RegisterModule],
})
export class UsersModule {}
