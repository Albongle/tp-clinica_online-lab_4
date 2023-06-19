import { Pipe, PipeTransform } from '@angular/core';
import { ClinicHistory } from 'src/app/models/clinic_history.model';

@Pipe({
  name: 'clinichistory',
})
export class ClinicHistoryMappedListPipe implements PipeTransform {
  transform(value: ClinicHistory, ...args: unknown[]) {
    const obj: any = {
      Altura: `${value.height} Cm`,
      Peso: `${value.weight} Kgs`,
      Temperatura: `${value.temperature} °`,
      Presion: `${value.pressure}`,
    };

    if (value.data) {
      value.data.forEach((element) => {
        obj[element.key] = element.value;
      });
    }

    return obj;
  }
}
