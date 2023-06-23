import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { Log } from '../models/log.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  constructor(private readonly firebaseStoreProvider: FirebaseStoreProvider) {}

  public async getAllLogs() {
    const clinicalHistory = (await firstValueFrom(
      this.firebaseStoreProvider.getCollection('logs')
    )) as Log[];
    return clinicalHistory;
  }

  public saveLogWithIdInStore(id: string, log: Log) {
    return this.firebaseStoreProvider.setDocWithId(
      'logs',
      id,
      JSON.parse(JSON.stringify(log))
    );
  }

  public saveLogInStore(log: Log) {
    const doc = this.firebaseStoreProvider.createDoc('logs');

    log.id = doc.id;
    return this.firebaseStoreProvider.saveDoc(
      doc,
      JSON.parse(JSON.stringify(log))
    );
  }
}
