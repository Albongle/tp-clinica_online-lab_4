import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppoinmentComponent } from './appoinment.component';
import { CreateAppoinmentComponent } from './components/create-appoinment/create-appoinment.component';

const routes: Routes = [
  { path: '', component: AppoinmentComponent },
  {
    path: 'createappoinment',
    component: CreateAppoinmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppoinmentRoutingModule {}
