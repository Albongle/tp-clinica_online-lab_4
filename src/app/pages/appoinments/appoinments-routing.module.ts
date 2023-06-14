import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppoinmentsComponent } from './appoinments.component';

const routes: Routes = [
  { path: '', component: AppoinmentsComponent },
  {
    path: 'myappoinments',
    loadChildren: () =>
      import('./my-appoinments/my-appoinments.module').then(
        (m) => m.MyAppoinmentsModule
      ),
  },
  {
    path: 'createappoinments',
    loadChildren: () =>
      import('./create-appoinments/create-appoinments.module').then(
        (m) => m.CreateAppoinmentsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppoinmentsRoutingModule {}
