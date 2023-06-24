import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personalDate',
})
export class PersonalDatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const splitDate = value.split('/').reverse();
    const date = new Date(
      parseInt(splitDate[0]),
      parseInt(splitDate[1]),
      parseInt(splitDate[2])
    );
    return `${date.getDay()} de ${date.toLocaleDateString('es-ES', {
      month: 'long',
    })}`;
  }
}
