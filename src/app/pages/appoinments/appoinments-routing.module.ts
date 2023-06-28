import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppoinmentsComponent } from './appoinments.component';
import { CreateAppoinmentsComponent } from './components/create-appoinments/create-appoinments.component';
import { MyAppoinmentsComponent } from './components/my-appoinments/my-appoinments.component';
import { AdminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [
  { path: '', component: AppoinmentsComponent, canActivate: [AdminGuard] },
  {
    path: 'myappoinments',
    component: MyAppoinmentsComponent,
    data: [{ animation: 'myAppoinments' }],
  },
  {
    path: 'createappoinments',
    component: CreateAppoinmentsComponent,
    data: [{ animation: 'createAppoinments' }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppoinmentsRoutingModule {}
