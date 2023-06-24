import { Pipe, PipeTransform } from '@angular/core';
import { Appoinment } from 'src/app/models/appoinment.model';

@Pipe({
  name: 'specialistappoinmentlist',
})
export class SpecialistAppoinmentMappedListPipe implements PipeTransform {
  transform(value: Appoinment[], ...args: unknown[]) {
    return value.map((appoinment) => {
      const obj: any = {
        Objeto: appoinment,
        Dia: `${appoinment.day.dayOfWeek} - ${appoinment.day.date}`,
        Horario: `${appoinment.day.timeStart} a ${appoinment.day.timeEnd}`,
        Paciente: `${appoinment.patient.lastName}, ${appoinment.patient.name}`,
        Especialidad: `${appoinment.specialist.speciality.description}`,
        Reseña: appoinment.review,
        Estado: appoinment.state,
        'Calificacion recibida': appoinment.calification,
        'Aceptar turno': '',
      };

      return obj;
    });
  }
}
