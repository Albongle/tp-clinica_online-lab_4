import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAppoinmentsComponent } from './my-appoinments.component';

const routes: Routes = [{ path: '', component: MyAppoinmentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAppoinmentsRoutingModule { }
