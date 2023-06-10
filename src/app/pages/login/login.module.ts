import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QuickAccessComponent } from './quick-access/quick-access.component';
import { LoadingModule } from 'src/app/components/loading/loading.module';

@NgModule({
  declarations: [LoginComponent, QuickAccessComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    LoadingModule,
  ],
})
export class LoginModule {}
