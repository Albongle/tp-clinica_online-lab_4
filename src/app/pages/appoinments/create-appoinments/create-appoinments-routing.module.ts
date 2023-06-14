import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAppoinmentsComponent } from './create-appoinments.component';

const routes: Routes = [{ path: '', component: CreateAppoinmentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAppoinmentsRoutingModule { }
