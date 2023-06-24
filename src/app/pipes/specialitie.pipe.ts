import { Pipe, PipeTransform } from '@angular/core';
import { Speciality } from 'src/app/models/speciality.model';

@Pipe({
  name: 'specialitie',
})
export class SpecialitiePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): string {
    const speciality = value as Speciality;
    return speciality.description;
  }
}
