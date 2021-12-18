import { Inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  FieldValue,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  PartialWithFieldValue,
  query,
  QueryConstraint,
  serverTimestamp,
  setDoc,
  SetOptions,
  UpdateData,
  updateDoc,
} from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import { fromFirebasePromise } from '../utils';
import { FirebaseFirestoreModel } from './firebase-firestore-model';
import { FirebaseFirestorePath } from './firebase-firestore-path';

import { FIREBASE_FIRESTORE_TOKEN } from './firebase-firestore-token';
import { getCollectionOrDocumentPath, getModel, QueryBuilder } from './utils';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFirestoreService {
  constructor(
    @Inject(FIREBASE_FIRESTORE_TOKEN) private readonly firestore: Firestore
  ) {}

  getOne<T>(
    path: FirebaseFirestorePath
  ): Observable<FirebaseFirestoreModel<T> | null> {
    const documentReference = this.getDocumentReference<T>(path);

    return fromFirebasePromise(getDoc(documentReference)).pipe(map(getModel));
  }

  getOneWithChanges<T>(
    path: FirebaseFirestorePath
  ): Observable<FirebaseFirestoreModel<T> | null> {
    const documentReference = this.getDocumentReference<T>(path);

    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(
        documentReference,
        (doc) => {
          subscriber.next(getModel(doc));
        },
        (error) => {
          subscriber.error(error);
        },
        () => {
          subscriber.complete();
        }
      );

      return {
        unsubscribe,
      };
    });
  }

  getMany<T>(
    path: FirebaseFirestorePath,
    queryConstraints: QueryConstraint[] = []
  ): Observable<FirebaseFirestoreModel<T>[]> {
    const collectionReference = this.getCollectionReference<T>(path);

    const q = query(collectionReference, ...queryConstraints);

    return fromFirebasePromise(getDocs(q)).pipe(
      map((querySnapshot) => querySnapshot.docs),
      map((docs) =>
        docs.map((doc) => getModel(doc) as FirebaseFirestoreModel<T>)
      )
    );
  }

  getManyWithChanges<T>(
    path: FirebaseFirestorePath,
    queryConstraints: QueryConstraint[] = []
  ): Observable<FirebaseFirestoreModel<T>[]> {
    const collectionReference = this.getCollectionReference<T>(path);

    const q = query(collectionReference, ...queryConstraints);

    return new Observable((subscriber) => {
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const docs = querySnapshot.docs.map(
            (doc) => getModel(doc) as FirebaseFirestoreModel<T>
          );
          subscriber.next(docs);
        },
        (error) => {
          subscriber.error(error);
        },
        () => {
          subscriber.complete();
        }
      );

      return {
        unsubscribe,
      };
    });
  }

  addOne<T>(path: FirebaseFirestorePath, data: T): Observable<string> {
    const collectionReference = this.getCollectionReference<T>(path);

    return fromFirebasePromise(addDoc(collectionReference, data)).pipe(
      map((documentReference) => documentReference.id)
    );
  }

  updateOne<T>(
    path: FirebaseFirestorePath,
    data: UpdateData<T>
  ): Observable<void> {
    const documentReference = this.getDocumentReference<T>(path);

    return fromFirebasePromise(updateDoc(documentReference, data));
  }

  setOne<T>(
    path: FirebaseFirestorePath,
    data: PartialWithFieldValue<T>,
    options: SetOptions = {}
  ): Observable<void> {
    const documentReference = this.getDocumentReference<T>(path);

    return fromFirebasePromise(setDoc(documentReference, data, options));
  }

  deleteOne(path: FirebaseFirestorePath): Observable<void> {
    const documentReference = this.getDocumentReference(path);

    return fromFirebasePromise(deleteDoc(documentReference));
  }

  getServerTimestamp(): FieldValue {
    return serverTimestamp();
  }

  createQueryBuilder<T>(): QueryBuilder<T> {
    return new QueryBuilder<T>();
  }

  private getDocumentReference<T>(
    path: FirebaseFirestorePath
  ): DocumentReference<T> {
    const documentPath = getCollectionOrDocumentPath(path);

    return doc(this.firestore, documentPath) as DocumentReference<T>;
  }

  private getCollectionReference<T>(
    path: FirebaseFirestorePath
  ): CollectionReference<T> {
    const collectionPath = getCollectionOrDocumentPath(path);

    return collection(this.firestore, collectionPath) as CollectionReference<T>;
  }
}
