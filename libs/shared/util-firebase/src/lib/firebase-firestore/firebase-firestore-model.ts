import { DocumentReference } from 'firebase/firestore';

export type FirebaseFirestoreModel<T> = T & {
  id: string;
  ref: DocumentReference<T>;
};
