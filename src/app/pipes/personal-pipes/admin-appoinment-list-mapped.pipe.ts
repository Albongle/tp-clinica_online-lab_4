import { Pipe, PipeTransform } from '@angular/core';
import { Appoinment } from 'src/app/models/appoinment.model';

@Pipe({
  name: 'adminappoinmentlist',
})
export class AdminAppoinmentMappedListPipe implements PipeTransform {
  transform(
    value: Appoinment[],
    ...args: unknown[]
  ): {
    Objeto: Appoinment;
    Dia: string;
    Horario: string;
    Especialista: string;
    Especiaidad: string;
    Estado: string;
  }[] {
    return value.map((appoinment) => {
      const obj: any = {
        Objeto: appoinment,
        Dia: `${appoinment.day.dayOfWeek} - ${appoinment.day.date}`,
        Horario: `${appoinment.day.timeStart} a ${appoinment.day.timeEnd}`,
        Paciente: `${appoinment.patient.lastName}, ${appoinment.patient.name}`,
        Especialista: `${appoinment.specialist.lastName}, ${appoinment.specialist.name}`,
        Especialidad: `${appoinment.specialist.speciality.description}`,
        Reseña: appoinment.review,
        Estado: appoinment.state,
        'Calificacion recibida': appoinment.calification,
      };

      return obj;
    });
  }
}
