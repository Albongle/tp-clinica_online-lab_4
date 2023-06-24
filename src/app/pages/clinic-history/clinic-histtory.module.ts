import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicHistoryComponent } from './clinic-history.component';
import { PersonalPipesModule } from 'src/app/pipes/personal-pipes.module';
import { LoadingModule } from 'src/app/components/loading/loading.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ClinicHistoryComponent],
  imports: [CommonModule, PersonalPipesModule, LoadingModule, ButtonModule],
  exports: [ClinicHistoryComponent],
})
export class ClinicHisttoryModule {}
