import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { QuickAccessModule } from 'src/app/components/quick-access/quick-access.module';
import { PersonalDirectivesModule } from 'src/app/directives/personal-directives.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    LoadingModule,
    QuickAccessModule,
    PersonalDirectivesModule,
  ],
})
export class LoginModule {}
