import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { firstValueFrom } from 'rxjs';
import { Speciality } from '../models/speciality.model';

@Injectable({
  providedIn: 'root',
})
export class SpecialitiesService {
  constructor(private readonly firebaseStoreProvider: FirebaseStoreProvider) {}

  public async getAllSpecialities() {
    const specialities = (await firstValueFrom(
      this.firebaseStoreProvider.getCollection('especialidades')
    )) as Speciality[];
    return specialities;
  }
}
