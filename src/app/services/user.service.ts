import { Injectable } from '@angular/core';
import { FirebaseAuthProvider } from '../providers/firebase_auth.provider';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { Router } from '@angular/router';
import { User } from '../models/users/user.model';
import { firstValueFrom } from 'rxjs';
import { Specialist } from '../models/users/specialist.model';
import { FirebaseStorageProvider } from '../providers/firebase_storage.provider';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly firebaseAuthProvider: FirebaseAuthProvider,
    private readonly firebaseStoreProvider: FirebaseStoreProvider,
    private readonly firebaseStorageProvider: FirebaseStorageProvider,
    private readonly router: Router
  ) {}

  public async loginWithEmailAndPassword(email: string, password: string) {
    const user = await this.firebaseAuthProvider.loginWithEmailAndPassword(
      email,
      password
    );

    return user;
  }

  public async registerWithFirebase(newUser: User) {
    const user =
      await this.firebaseAuthProvider.registerUserWithEmailAndPassword(newUser);
    return user;
  }

  public async getUsersFromStore() {
    const users = (await firstValueFrom(
      this.firebaseStoreProvider.getCollection('usuarios')
    )) as User[];
    return users;
  }

  public saveUserWithIdInStore(id: string, user: User) {
    return this.firebaseStoreProvider.setDocWithId(
      'usuarios',
      id,
      JSON.parse(JSON.stringify(user))
    );
  }
  public async logout() {
    await this.firebaseAuthProvider.signOut();
    await this.router.navigateByUrl('login');
  }

  public uploadPhoto(fileName: string, file: any) {
    const reference =
      this.firebaseStorageProvider.referenceCloudStorage(fileName);
    return this.firebaseStorageProvider.uploadFile(reference, file);
  }
  public get userLogged() {
    return this.firebaseAuthProvider.userLogged;
  }

  public get userImageUrl() {
    return this.firebaseAuthProvider.profilePhoto;
  }

  public async authorizeSpecialistByAdmin(user: User) {
    const specialist = user as Specialist;
    specialist.verifiedByAdmin = true;
    await this.saveUserWithIdInStore(specialist.userId, specialist);
    return true;
  }

  public async getProfilePhoto(user: User) {
    try {
      const reference = this.firebaseStorageProvider.referenceCloudStorage(
        user.profilePhoto
      );
      const url = await this.firebaseStorageProvider.getUrlFromFile(reference);
      return url;
    } catch (error) {
      console.warn('No se obtuvo la imagen del usuario');
    }

    return undefined;
  }
}
