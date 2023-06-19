import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { ClinicHistory } from '../models/clinic_history.model';
import { firstValueFrom } from 'rxjs';

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
}
