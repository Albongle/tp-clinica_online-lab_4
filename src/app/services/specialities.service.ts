import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';

@Injectable({
  providedIn: 'root',
})
export class SpecialitiesService {
  constructor(private readonly firestoreProvider: FirebaseStoreProvider) {}

  public getAllSpecialities() {
    return this.firestoreProvider.getCollection('especialidades');
  }
}
