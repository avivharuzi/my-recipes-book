import { DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';

import { FirebaseFirestoreModel } from '../firebase-firestore-model';

export const getModel = <T>(
  documentSnapshot: DocumentSnapshot<T> | QueryDocumentSnapshot<T>
): FirebaseFirestoreModel<T> | null => {
  if (!documentSnapshot.exists()) {
    return null;
  }

  return {
    id: documentSnapshot.id,
    ref: documentSnapshot.ref,
    ...documentSnapshot.data(),
  };
};
