import { Injectable } from '@angular/core';
import { FirebaseAuthProvider } from '../providers/firebase_auth.provider';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { SessionStorageProvider } from '../providers/session_storage.provider';
import { Router } from '@angular/router';
import { User } from '../models/users/user.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userLogged: User | null;
  private _userImageUrl: string | null;
  constructor(
    private readonly firebaseAuthProvider: FirebaseAuthProvider,
    private readonly firebaseStoreProvider: FirebaseStoreProvider,
    private readonly sessionStorageProvider: SessionStorageProvider,
    private readonly router: Router
  ) {}

  public async loginWithEmailAndPassword(email: string, password: string) {
    const result = await this.firebaseAuthProvider.loginWithEmailAndPassword(
      email,
      password
    );
    const users = await this.getUsersFromStore();
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    ) as User;
    user.verified = result.user.emailVerified;
    await this.saveUserWithIdInStore(user.userId, user);
    this.sessionStorageProvider.saveCurrentUser({ ...user, password: 'n/a' });
    this._userLogged = user;
    this._userImageUrl = await this.getUrlPhotoProfile(1);
    return this._userLogged;
  }

  public async registerWithFirebase(user: User) {
    const result =
      await this.firebaseAuthProvider.registerUserWithEmailAndPassword(user);
    user.verified = result.user.emailVerified;
    user.userId = result.user.uid;
    await this.firebaseAuthProvider.sendEmailVerification();
    await this.saveUserWithIdInStore(user.userId, user);
    this.sessionStorageProvider.saveCurrentUser({ ...user, password: 'n/a' });
    this._userLogged = user;
    return this._userLogged;
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
  public logout() {
    this.firebaseAuthProvider.signOut().then(() => {
      this.sessionStorageProvider.clearCurrentUser();
      this._userLogged = null;
      this.router.navigateByUrl('');
    });
  }

  public uploadPhoto(fileName: string, file: any) {
    const reference =
      this.firebaseStoreProvider.referenceCloudStorage(fileName);
    return this.firebaseStoreProvider.uploadFile(reference, file);
  }
  public get userLogged() {
    return this._userLogged;
  }

  public get userImageUrl() {
    return this._userImageUrl;
  }

  public setUserLogger() {
    this._userLogged = this.sessionStorageProvider.getCurrentUser();
  }
  public async getUrlPhotoProfile(index: number) {
    const reference = this.firebaseStoreProvider.referenceCloudStorage(
      `${this._userLogged?.email}_${index}`
    );
    const url = await this.firebaseStoreProvider.getUrlFromFile(reference);
    return url;
  }
}
