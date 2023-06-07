import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { RegisterModule } from '../register/register.module';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, RegisterModule, TableModule],
})
export class UsersModule {}
