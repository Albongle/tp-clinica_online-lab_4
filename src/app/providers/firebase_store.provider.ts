import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  setDoc,
  doc,
} from '@angular/fire/firestore';

import {
  ref,
  Storage,
  StorageReference,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStoreProvider {
  constructor(
    private readonly firestore: Firestore,
    private readonly storage: Storage
  ) {}

  public getCollection(col: string) {
    return collectionData(collection(this.firestore, col));
  }

  public saveDoc(col: string, doc: any) {
    return addDoc(collection(this.firestore, col), doc);
  }

  public setDocWithId(col: string, id: any, data: any) {
    return setDoc(doc(this.firestore, col, id), data);
  }

  public referenceCloudStorage(fileName: string) {
    return ref(this.storage, fileName);
  }
  public uploadFile(reference: StorageReference, data: any) {
    return uploadBytes(reference, data);
  }
  public getUrlFromFile(reference: StorageReference) {
    return getDownloadURL(reference);
  }
}
