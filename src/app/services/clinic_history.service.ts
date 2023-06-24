import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { ClinicHistory } from '../models/clinic_history.model';
import { firstValueFrom } from 'rxjs';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class ClinicHistoryService {
  constructor(private readonly firebaseStoreProvider: FirebaseStoreProvider) {}

  public async getAllClinicHistory() {
    const clinicalHistory = (await firstValueFrom(
      this.firebaseStoreProvider.getCollection('historial_clinico')
    )) as ClinicHistory[];
    return clinicalHistory;
  }

  public saveClinicHistoryWithIdInStore(
    id: string,
    clinicHistory: ClinicHistory
  ) {
    return this.firebaseStoreProvider.setDocWithId(
      'historial_clinico',
      id,
      JSON.parse(JSON.stringify(clinicHistory))
    );
  }

  public saveClinicHistoryInStore(clinicHistory: ClinicHistory) {
    const doc = this.firebaseStoreProvider.createDoc('historial_clinico');

    clinicHistory.id = doc.id;
    return this.firebaseStoreProvider.saveDoc(
      doc,
      JSON.parse(JSON.stringify(clinicHistory))
    );
  }

  public createPdf(userName: string, clinicHistory: ClinicHistory[]) {
    const pdfFile = new jsPDF('portrait', 'px', 'a4');
    const image = new Image();
    image.src = '../../assets/images/clinica-online-logo.png';
    pdfFile.text('HISTORIA CLINICA Solicitado por:  ' + userName, 140, 70);
    const date = new Date().toLocaleString();
    pdfFile.addImage(image, 'PNG', 10, 10, 60, 60);
    pdfFile.text('Fecha Emisión: ' + date, 240, 20);

    const position = this.updatePosition();

    clinicHistory.forEach((element) => {
      pdfFile.text(
        `Especialidad: ${element.appoinment.specialist.speciality.description}`,
        35,
        position()
      );
      pdfFile.text(
        `Paciente: ${element.appoinment.patient.lastName}, ${element.appoinment.patient.name}`,
        35,
        position()
      );
      pdfFile.text(
        `Fecha:${element.appoinment.day.dayOfWeek} - ${element.appoinment.day.date}`,
        35,
        position()
      );
      pdfFile.text(`Altura: ${element.height} Cm`, 35, position());
      pdfFile.text(`Peso: ${element.weight} Kgs`, 35, position());
      pdfFile.text(`Presion: ${element.height}`, 35, position());
      pdfFile.text(`Altura: ${element.height} Cm`, 35, position());

      if (element.data) {
        element.data.forEach((element) => {
          pdfFile.text(`${[element.key]}: ${element.value}`, 35, position());
        });
      }
      position();
    });

    const fileName = `Historia_Clinica_${date}_${userName}.pdf`;
    pdfFile.save(fileName);
  }

  private updatePosition(value?: number) {
    let position = 120;
    return () => (position += value ?? 15);
  }
}
