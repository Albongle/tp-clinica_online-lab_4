import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { ClinicHistory } from '../models/clinic_history.model';

@Injectable({
  providedIn: 'root',
})
export class ClinicHistoryService {
  constructor(private readonly firebaseStoreProvider: FirebaseStoreProvider) {}

  public getAllAppoinment() {
    return this.firebaseStoreProvider.getCollection('turnos');
  }

  public saveAppoinmentWithIdInStore(id: string, clinicHistory: ClinicHistory) {
    return this.firebaseStoreProvider.setDocWithId(
      'historial_clinico',
      id,
      JSON.parse(JSON.stringify(clinicHistory))
    );
  }

  public saveAppoinmenInStore(clinicHistory: ClinicHistory) {
    const doc = this.firebaseStoreProvider.createDoc('historial_clinico');

    clinicHistory.id = doc.id;
    return this.firebaseStoreProvider.saveDoc(
      doc,
      JSON.parse(JSON.stringify(clinicHistory))
    );
  }
}
