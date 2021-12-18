import { defer, from, Observable } from 'rxjs';

export const fromFirebasePromise = <T>(promise: Promise<T>): Observable<T> => {
  return defer(() => from(promise));
};
