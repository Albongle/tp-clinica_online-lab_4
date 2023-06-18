import { Injectable } from '@angular/core';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { firstValueFrom } from 'rxjs';
import { Speciality } from '../models/speciality.model';
import { FirebaseStorageProvider } from '../providers/firebase_storage.provider';

@Injectable({
  providedIn: 'root',
})
export class SpecialitiesService {
  constructor(
    private readonly firebaseStoreProvider: FirebaseStoreProvider,
    private readonly firebaseStorageProvider: FirebaseStorageProvider
  ) {}

  public async getAllSpecialities() {
    let specialities = (await firstValueFrom(
      this.firebaseStoreProvider.getCollection('especialidades')
    )) as Speciality[];
    specialities = await Promise.all(
      specialities.map(async (speciality) => {
        return {
          ...speciality,
          image: await this.getSpecialityPhoto(speciality),
        };
      })
    );
    return specialities;
  }

  private async getSpecialityPhoto(speciality: Speciality) {
    try {
      const reference = this.firebaseStorageProvider.referenceCloudStorage(
        speciality.image!
      );
      const url = await this.firebaseStorageProvider.getUrlFromFile(reference);
      return url;
    } catch (error) {
      console.warn('No se obtuvo la imagen de la especialidad');
    }

    return undefined;
  }
}
