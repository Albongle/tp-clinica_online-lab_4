import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  User as UserFirebase,
} from '@angular/fire/auth';
import { User } from '../models/users/user.model';
import { firstValueFrom } from 'rxjs';
import { FirebaseStoreProvider } from './firebase_store.provider';
import { Specialist } from '../models/users/specialist.model';
import { Patient } from '../models/users/patient.model';
import { Admin } from '../models/users/admin.model';
import { FirebaseStorageProvider } from './firebase_storage.provider';
import { LogsService } from '../services/logs.service';
import { Log } from '../models/log.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthProvider {
  private __userAdmin: User | undefined;
  private _userLogged: User | undefined;

  constructor(
    private readonly fireAuth: Auth,
    private readonly firebaseStoreProvider: FirebaseStoreProvider,
    private readonly firebaseStorageProvider: FirebaseStorageProvider,
    private readonly logService: LogsService
  ) {
    this.fireAuth.onAuthStateChanged((userFirebase) => {
      this.findUserFromSessionByEmail(userFirebase)
        .then((user) => {
          this._userLogged = user;
        })
        .catch((e) => console.warn(e));
    });
  }

  public async loginWithEmailAndPassword(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
      this.fireAuth,
      email,
      password
    );
    this._userLogged = await this.findUserFromSessionByEmail(
      userCredential.user
    );
    if (this._userLogged?.userRole !== 'admin') {
      await this.validateEmailVerified(userCredential.user);

      await this.validateSpecialist(this._userLogged!);
    }
    const log = new Log(this._userLogged!);
    await this.logService.saveLogInStore(log);
    return this.userLogged;
  }

  public async registerUserWithEmailAndPassword(user: User) {
    if (this._userLogged && this.userLogged?.userRole === 'admin') {
      this.__userAdmin = new Admin({ ...this._userLogged });
    }
    const userCredential = await createUserWithEmailAndPassword(
      this.fireAuth,
      user.email,
      user.password
    );
    user.verified = userCredential.user.emailVerified;
    user.userId = userCredential.user.uid;
    await sendEmailVerification(userCredential.user);
    await this.saveUserWithIdInStore(user.userId, user);

    if (this.__userAdmin) {
      await this.signOut();
      await this.loginWithEmailAndPassword(
        this.__userAdmin.email,
        this.__userAdmin.password
      );
    }
    return this._userLogged;
  }

  public get userLogged() {
    return this._userLogged;
  }

  private async getUsersFromStore() {
    let users = (await firstValueFrom(
      this.firebaseStoreProvider.getCollection('usuarios')
    )) as User[];
    users = await Promise.all(
      users.map(async (user) => {
        return {
          ...user,
          profilePhoto: (await this.getProfilePhoto(user)) as string,
        };
      })
    );
    return users;
  }

  private async findUserFromSessionByEmail(currentUser: UserFirebase | null) {
    if (currentUser) {
      const users = await this.getUsersFromStore();
      const user = users.find((u: any) => u.email === currentUser.email);

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

  private async getProfilePhoto(user: User) {
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

  public signOut() {
    return this.fireAuth.signOut();
  }

  private async validateSpecialist(user: User) {
    if (user instanceof Specialist && !user.verifiedByAdmin) {
      await this.signOut();
      throw new Error('Su cuenta aun no fue validada por un administrador');
    }
  }
  private async validateEmailVerified(userFirebase: UserFirebase) {
    if (!userFirebase.emailVerified) {
      await this.signOut();
      throw new Error('Debe validar su correo electronico');
    }
    await this.rewriteFieldVerified(this._userLogged!, userFirebase);
  }

  private async rewriteFieldVerified(user: User, userFirebase: UserFirebase) {
    if (user.verified !== userFirebase.emailVerified) {
      user.verified = userFirebase.emailVerified;
      await this.firebaseStoreProvider.setDocWithId(
        'usuarios',
        user.userId,
        JSON.parse(JSON.stringify(user))
      );
    }
  }

  private saveUserWithIdInStore(id: string, user: User) {
    return this.firebaseStoreProvider.setDocWithId(
      'usuarios',
      id,
      JSON.parse(JSON.stringify(user))
    );
  }
}
