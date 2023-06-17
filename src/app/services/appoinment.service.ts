import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { Appoinment } from 'src/app/models/appoinment.model';

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
}
