import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoggedGuard } from './guards/user-logged.guard';
import { AdminGuard } from './guards/admin.guard';
import { AuthorizationGuard } from './guards/authorization.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
    canActivate: [UserLoggedGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
    canActivate: [UserLoggedGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [UserLoggedGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
    canActivate: [AdminGuard],
  },

  {
    path: 'myprofile',
    loadChildren: () =>
      import('./pages/my-profile/my-profile.module').then(
        (m) => m.MyProfileModule
      ),
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'myappoinments',
    loadChildren: () =>
      import('./pages/my-appoinments/my-appoinments.module').then(
        (m) => m.MyAppoinmentsModule
      ),
  },
  {
    path: 'createappoinments',
    loadChildren: () =>
      import('./pages/create-appoinments/create-appoinments.module').then(
        (m) => m.CreateAppoinmentsModule
      ),
  },
  { path: 'appoinments', loadChildren: () => import('./pages/appoinments/appoinments.module').then(m => m.AppoinmentsModule) },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
