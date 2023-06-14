import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeysUserMappedPipe } from './keys-users-names.pipe';
import { SpecialistPipe } from './specialist.pipe';
import { SpecialitiePipe } from './specialitie.pipe';
import { AppoinmentMappedListPipe } from './appoinment-list-mapped.pipe';

@NgModule({
  declarations: [
    KeysUserMappedPipe,
    SpecialistPipe,
    SpecialitiePipe,
    AppoinmentMappedListPipe,
  ],
  imports: [CommonModule],
  exports: [
    KeysUserMappedPipe,
    SpecialistPipe,
    SpecialitiePipe,
    AppoinmentMappedListPipe,
  ],
})
export class PersonalPipesModule {}
