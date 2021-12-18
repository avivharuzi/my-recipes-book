import { User, UserCredential } from 'firebase/auth';
import { map, Observable } from 'rxjs';

import { fromFirebasePromise } from '../../utils';

export const fromFirebaseSignInPromise = (
  promise: Promise<UserCredential>
): Observable<User> => {
  return fromFirebasePromise(promise).pipe(
    map((userCredential) => userCredential.user)
  );
};
