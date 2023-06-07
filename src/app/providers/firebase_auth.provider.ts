import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  browserSessionPersistence,
} from '@angular/fire/auth';
import { User } from '../models/users/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthProvider {
  constructor(private readonly fireAuth: Auth) {}

  public async loginWithEmailAndPassword(email: string, password: string) {
    await this.fireAuth.setPersistence(browserSessionPersistence);
    return signInWithEmailAndPassword(this.fireAuth, email, password);
  }

  public async registerUserWithEmailAndPassword(user: User) {
    return createUserWithEmailAndPassword(
      this.fireAuth,
      user.email,
      user.password
    );
  }

  public async sendEmailVerification() {
    await sendEmailVerification(this.fireAuth.currentUser!);
  }

  public get ApiKey() {
    return this.fireAuth.config.apiKey;
  }

  public signOut() {
    return this.fireAuth.signOut();
  }
}
