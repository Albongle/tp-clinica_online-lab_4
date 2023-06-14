import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { Appoinment } from 'src/app/models/appoinment.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppoinmentService {
  constructor(private readonly firebaseStoreProvider: FirebaseStoreProvider) {}

  public async getAllAppoinment() {
    const appoinment = (await firstValueFrom(
      this.firebaseStoreProvider.getCollection('turnos')
    )) as Appoinment[];
    return appoinment;
  }

  public saveAppoinmentWithIdInStore(id: string, appoinment: Appoinment) {
    return this.firebaseStoreProvider.setDocWithId(
      'turnos',
      id,
      JSON.parse(JSON.stringify(appoinment))
    );
  }

  public saveAppoinmenInStore(appoinment: Appoinment) {
    return this.firebaseStoreProvider.saveDoc(
      'turnos',
      JSON.parse(JSON.stringify(appoinment))
    );
  }
}
