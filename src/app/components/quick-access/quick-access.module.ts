import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickAccessComponent } from './quick-access.component';
import { PersonalDirectivesModule } from 'src/app/directives/personal-directives.module';

@NgModule({
  declarations: [QuickAccessComponent],
  imports: [CommonModule, PersonalDirectivesModule],
  exports: [QuickAccessComponent],
})
export class QuickAccessModule {}
