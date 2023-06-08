import { Injectable } from '@angular/core';
import { FirebaseAuthProvider } from '../providers/firebase_auth.provider';
import { FirebaseStoreProvider } from '../providers/firebase_store.provider';
import { SessionStorageProvider } from '../providers/session_storage.provider';
import { Router } from '@angular/router';
import { User } from '../models/users/user.model';
import { firstValueFrom } from 'rxjs';
import { Specialist } from '../models/users/specialist.model';
import { Patient } from '../models/users/patient.model';
import { UserCredential } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _userLogged: User | undefined;
  private _userImageUrl: string | undefined;
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

    const user = await this.findUserFromSessionByEmail();
    if (user?.userRole !== 'admin') {
      if (result.user.emailVerified) {
        await this.rewriteFieldVerified(user!, result);
        if (user instanceof Specialist) {
          await this.validateSpecialist(user);
        }
      } else {
        await this.logout();
        throw new Error('Debe validar su correo electronico');
      }
    }
    this._userLogged = user;
    this._userImageUrl = await this.getUrlPhotoProfile(user?.profilePhoto!);
    return this._userLogged;
  }

  public async registerWithFirebase(user: User) {
    const result =
      await this.firebaseAuthProvider.registerUserWithEmailAndPassword(user);
    user.verified = result.user.emailVerified;
    user.userId = result.user.uid;
    await this.firebaseAuthProvider.sendEmailVerification();
    await this.saveUserWithIdInStore(user.userId, user);
    this._userLogged = user;
    await this.logout();
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
  public async logout() {
    await this.firebaseAuthProvider.signOut();
    await this.router.navigateByUrl('login');
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

  public async setUserLogger() {
    this._userLogged = await this.findUserFromSessionByEmail();
    if (this._userLogged) {
      this._userImageUrl = await this.getUrlPhotoProfile(
        this._userLogged.profilePhoto
      );
    }
  }
  public async getUrlPhotoProfile(fileName: string) {
    try {
      const reference =
        this.firebaseStoreProvider.referenceCloudStorage(fileName);
      const url = await this.firebaseStoreProvider.getUrlFromFile(reference);
      return url;
    } catch (error) {
      console.warn('No se obtuvo la imagen del usuario');
    }

    return undefined;
  }

  // private async findUserForSessionByEmail(email: string) {
  //   const users = await this.getUsersFromStore();
  //   const user = users.find((u: any) => u.email === email);

  //   switch (user?.userRole) {
  //     case 'specialist':
  //       return new Specialist(user as Specialist);
  //     case 'patient':
  //       return new Patient(user as Patient);
  //   }
  //   return user;
  // }

  private async findUserFromSessionByEmail() {
    const userSession = this.sessionStorageProvider.getCurrentSession();
    if (userSession) {
      const users = await this.getUsersFromStore();
      const user = users.find((u: any) => u.email === userSession.email);

      switch (user?.userRole) {
        case 'specialist':
          return new Specialist(user as Specialist);
        case 'patient':
          return new Patient(user as Patient);
      }
      return user;
    }
    return undefined;
  }

  private async validateSpecialist(user: Specialist) {
    if (!user.verifiedByAdmin) {
      await this.logout();
      throw new Error('Su cuenta aun no fue validada por un administrador');
    }
  }

  private async rewriteFieldVerified(
    user: User,
    userCredential: UserCredential
  ) {
    if (user.verified !== userCredential.user.emailVerified) {
      user.verified = userCredential.user.emailVerified;
      await this.saveUserWithIdInStore(user.userId, user);
    }
  }

  public async authorizeSpecialistByAdmin(user: User) {
    const specialist = user as Specialist;
    specialist.verifiedByAdmin = true;
    await this.saveUserWithIdInStore(specialist.userId, specialist);
    return true;
  }
}
