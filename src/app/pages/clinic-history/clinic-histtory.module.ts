import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicHistoryComponent } from './clinic-history.component';
import { PersonalPipesModule } from 'src/app/pipes/personal-pipes/personal-pipes.module';

@NgModule({
  declarations: [ClinicHistoryComponent],
  imports: [CommonModule, PersonalPipesModule],
  exports: [ClinicHistoryComponent],
})
export class ClinicHisttoryModule {}
