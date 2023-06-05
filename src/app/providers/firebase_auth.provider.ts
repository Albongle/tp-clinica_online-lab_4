import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthProvider {
  constructor(private readonly fireAuth: Auth) {
    this.fireAuth.setPersistence(browserSessionPersistence);
  }

  public loginWithEmailAndPassword(user: any) {
    return signInWithEmailAndPassword(
      this.fireAuth,
      user.email!,
      user.password!
    );
  }

  public registerUserWithEmailAndPassword(user: any) {
    return createUserWithEmailAndPassword(
      this.fireAuth,
      user.email!,
      user.password!
    );
  }

  public get ApiKey() {
    return this.fireAuth.config.apiKey;
  }

  public signOut() {
    return this.fireAuth.signOut();
  }
}
