import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personalDate',
})
export class PersonalDatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const splitDate = value.split('/').reverse();
    const [year, month, day] = splitDate;
    const date = new Date(parseInt(year), parseInt(month), parseInt(day));
    return `${date.getDay()} de ${date.toLocaleDateString('es-ES', {
      month: 'long',
    })}`;
  }
}
