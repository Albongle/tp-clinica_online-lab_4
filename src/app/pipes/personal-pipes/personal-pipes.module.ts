import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeysMappedPipe } from './keys-names.pipe';
import { SpecialistPipe } from './specialist.pipe';
import { SpecialitiePipe } from './specialitie.pipe';

@NgModule({
  declarations: [KeysMappedPipe, SpecialistPipe, SpecialitiePipe],
  imports: [CommonModule],
  exports: [KeysMappedPipe, SpecialistPipe, SpecialitiePipe],
})
export class PersonalPipesModule {}
