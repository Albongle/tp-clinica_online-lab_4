import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  sendEmailVerification,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthProvider {
  constructor(private readonly fireAuth: Auth) {}

  public loginWithEmailAndPassword(user: any) {
    return signInWithEmailAndPassword(
      this.fireAuth,
      user.email!,
      user.password!
    );
  }

  public async registerUserWithEmailAndPassword(user: any) {
    return createUserWithEmailAndPassword(
      this.fireAuth,
      user.email!,
      user.password!
    );
  }

  public async sendEmailVerification(user: any) {
    await sendEmailVerification(user);
  }

  public get ApiKey() {
    return this.fireAuth.config.apiKey;
  }

  public signOut() {
    return this.fireAuth.signOut();
  }
}
