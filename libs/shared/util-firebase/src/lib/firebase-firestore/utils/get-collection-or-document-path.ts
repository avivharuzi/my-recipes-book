import { FirebaseFirestorePath } from '../firebase-firestore-path';

export const getCollectionOrDocumentPath = (
  path: FirebaseFirestorePath
): string => {
  return Array.isArray(path) ? path.join('/') : path;
};
