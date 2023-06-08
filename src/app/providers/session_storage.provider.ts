import { Injectable } from '@angular/core';
import { FirebaseAuthProvider } from './firebase_auth.provider';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageProvider {
  private key: string;

  constructor(private readonly firebaseAuthProvider: FirebaseAuthProvider) {
    this.key = `firebase:authUser:${this.firebaseAuthProvider.ApiKey}:[DEFAULT]`;
  }
  public getCurrentSession() {
    return JSON.parse(sessionStorage.getItem(this.key) as string) as User;
  }
}
