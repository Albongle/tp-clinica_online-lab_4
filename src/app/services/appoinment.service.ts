import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { Appoinment } from 'src/app/models/appoinment.model';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class AppoinmentService {
  constructor(private readonly firebaseStoreProvider: FirebaseStoreProvider) {}

  public getAllAppoinment() {
    return this.firebaseStoreProvider.getCollection('turnos');
  }

  public saveAppoinmentWithIdInStore(id: string, appoinment: Appoinment) {
    return this.firebaseStoreProvider.setDocWithId(
      'turnos',
      id,
      JSON.parse(JSON.stringify(appoinment))
    );
  }

  public saveAppoinmenInStore(appoinment: Appoinment) {
    const doc = this.firebaseStoreProvider.createDoc('turnos');

    appoinment.id = doc.id;
    return this.firebaseStoreProvider.saveDoc(
      doc,
      JSON.parse(JSON.stringify(appoinment))
    );
  }

  public exportAppoinmentsToXls(appoinments: Appoinment[], fileName: string) {
    const appoinmentsMapped = appoinments.map((appoinment) => {
      return {
        Dia: `${appoinment.day.dayOfWeek} - ${appoinment.day.date}`,
        Horario: `${appoinment.day.timeStart} a ${appoinment.day.timeEnd}`,
        Especialista: `${appoinment.specialist.lastName}, ${appoinment.specialist.name}`,
        Especialidad: `${appoinment.specialist.speciality.description}`,
        Reseña: appoinment.review,
        Estado: appoinment.state,
        'Encuesta realizada': `${appoinment.survey ? 'Si' : 'No'}`,
        'Calificacion brindada': appoinment.calification,
      };
    });

    const workSheet = XLSX.utils.json_to_sheet(appoinmentsMapped);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'turnos');
    XLSX.writeFile(workBook, `${fileName}.xlsx`);
  }
}
