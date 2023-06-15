import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'any',
})
export class AnyPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): any {
    return value as any;
  }
}
