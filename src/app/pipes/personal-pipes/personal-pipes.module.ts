import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeysUserMappedPipe } from './keys-users-names.pipe';
import { SpecialistPipe } from './specialist.pipe';
import { SpecialitiePipe } from './specialitie.pipe';
import { SpecialistAppoinmentMappedListPipe } from './specialist-appoinment-list-mapped.pipe';
import { PatientAppoinmentMappedListPipe } from './patient-appoinment-list-mapped.pipe copy';

@NgModule({
  declarations: [
    KeysUserMappedPipe,
    SpecialistPipe,
    SpecialitiePipe,
    PatientAppoinmentMappedListPipe,
    SpecialistAppoinmentMappedListPipe,
  ],
  imports: [CommonModule],
  exports: [
    KeysUserMappedPipe,
    SpecialistPipe,
    SpecialitiePipe,
    PatientAppoinmentMappedListPipe,
    SpecialistAppoinmentMappedListPipe,
  ],
})
export class PersonalPipesModule {}
