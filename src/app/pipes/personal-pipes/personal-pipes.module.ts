import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeysUserMappedPipe } from './keys-users-names.pipe';
import { SpecialistPipe } from './specialist.pipe';
import { SpecialitiePipe } from './specialitie.pipe';
import { SpecialistAppoinmentMappedListPipe } from './specialist-appoinment-list-mapped.pipe';
import { PatientAppoinmentMappedListPipe } from './patient-appoinment-list-mapped.pipe copy';
import { AnyPipe } from './any.pipe';

@NgModule({
  declarations: [
    KeysUserMappedPipe,
    SpecialistPipe,
    SpecialitiePipe,
    PatientAppoinmentMappedListPipe,
    SpecialistAppoinmentMappedListPipe,
    AnyPipe,
  ],
  imports: [CommonModule],
  exports: [
    KeysUserMappedPipe,
    SpecialistPipe,
    SpecialitiePipe,
    PatientAppoinmentMappedListPipe,
    SpecialistAppoinmentMappedListPipe,
    AnyPipe,
  ],
})
export class PersonalPipesModule {}
