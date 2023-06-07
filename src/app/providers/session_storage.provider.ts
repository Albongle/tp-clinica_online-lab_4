import { Injectable } from '@angular/core';
import { FirebaseAuthProvider } from './firebase_auth.provider';
import { User } from '../models/users/user.model';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageProvider {
  private key: string;

  constructor(private readonly firebaseAuthProvider: FirebaseAuthProvider) {
    this.key = `firebase:authUser:${this.firebaseAuthProvider.ApiKey}:[DEFAULT]`;
  }
  public getCurrentUser() {
    return JSON.parse(sessionStorage.getItem(this.key) as string) as User;
  }
  public saveCurrentUser(user: User) {
    sessionStorage.setItem(this.key, JSON.stringify(user));
  }
  public clearCurrentUser() {
    sessionStorage.clear();
  }
}
