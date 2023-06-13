import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { firstValueFrom } from 'rxjs';
import { Specialitie } from '../models/specialitie.model';

@Injectable({
  providedIn: 'root',
})
export class SpecialitiesService {
  constructor(private readonly firebaseStoreProvider: FirebaseStoreProvider) {}

  public async getAllSpecialities() {
    const specialities = (await firstValueFrom(
      this.firebaseStoreProvider.getCollection('especialidades')
    )) as Specialitie[];
    return specialities;
  }
}
