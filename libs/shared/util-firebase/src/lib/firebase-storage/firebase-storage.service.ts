import { Inject, Injectable } from '@angular/core';
import {
  deleteObject,
  FirebaseStorage,
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytes,
  UploadResult,
} from 'firebase/storage';
import { Observable } from 'rxjs';
import { v4 as uuidV4 } from 'uuid';

import { fromFirebasePromise } from '../utils';
import { FIREBASE_STORAGE_TOKEN } from './firebase-storage-token';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  constructor(
    @Inject(FIREBASE_STORAGE_TOKEN) private readonly storage: FirebaseStorage
  ) {}

  getFileURL(path: string): Observable<string> {
    return fromFirebasePromise(getDownloadURL(this.getReference(path)));
  }

  uploadFile(
    path: string,
    data: Blob | Uint8Array | ArrayBuffer
  ): Observable<UploadResult> {
    return fromFirebasePromise(uploadBytes(this.getReference(path), data));
  }

  deleteFile(path: string): Observable<void> {
    return fromFirebasePromise(deleteObject(this.getReference(path)));
  }

  getReference(path: string): StorageReference {
    return ref(this.storage, path);
  }

  getUniquePathFromFile(subPath: string, file: File): string {
    const fileExtension = file.name.split('.').pop();

    return `${subPath}/${uuidV4()}.${fileExtension}`;
  }
}
