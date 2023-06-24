import { Pipe, PipeTransform } from '@angular/core';
import { Specialist } from 'src/app/models/users/specialist.model';

@Pipe({
  name: 'specialist',
})
export class SpecialistPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): Specialist {
    const specialist = value as Specialist;
    return specialist;
  }
}
