import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, first, map, Observable, switchMap } from 'rxjs';

import { AuthService } from '@my-recipes-book/shared/data-access-auth';
import {
  FirebaseFirestoreModel,
  FirebaseFirestoreService,
  FirebaseTimestamp,
} from '@my-recipes-book/shared/util-firebase';

import { Recipe } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly RECIPES_COLLECTION_NAME = 'recipes';

  constructor(
    private authService: AuthService,
    private firebaseFirestoreService: FirebaseFirestoreService,
    private router: Router
  ) {}

  create(recipe: Recipe): Observable<string> {
    return this.getCollectionPath().pipe(
      switchMap((recipesPath) =>
        this.firebaseFirestoreService.addOne<Recipe>(recipesPath, {
          ...recipe,
          updatedAt:
            this.firebaseFirestoreService.getServerTimestamp() as FirebaseTimestamp,
          createdAt:
            this.firebaseFirestoreService.getServerTimestamp() as FirebaseTimestamp,
        })
      )
    );
  }

  update(id: string, recipe: Recipe): Observable<void> {
    return this.getCollectionPath().pipe(
      switchMap((recipesPath) =>
        this.firebaseFirestoreService.updateOne<Recipe>([...recipesPath, id], {
          ...recipe,
          updatedAt:
            this.firebaseFirestoreService.getServerTimestamp() as FirebaseTimestamp,
        })
      )
    );
  }

  getAll(): Observable<FirebaseFirestoreModel<Recipe>[]> {
    return this.getCollectionPath().pipe(
      switchMap((recipesPath) =>
        this.firebaseFirestoreService.getManyWithChanges<Recipe>(
          recipesPath,
          this.firebaseFirestoreService
            .createQueryBuilder<Recipe>()
            .orderBy('createdAt')
            .getQueryConstraints()
        )
      )
    );
  }

  getDetail(id: string): Observable<FirebaseFirestoreModel<Recipe> | null> {
    return this.getCollectionPath().pipe(
      switchMap((recipesPath) =>
        this.firebaseFirestoreService.getOne<Recipe>([...recipesPath, id])
      )
    );
  }

  getDetailFromRoute(id$: Observable<string | null>) {
    return id$.pipe(
      switchMap((id) => {
        if (!id) {
          throw Error('ID is empty');
        }
        return this.getDetail(id);
      }),
      map((recipe) => {
        if (!recipe) {
          throw new Error('Not found recipe');
        }

        return recipe;
      }),
      catchError((error) => {
        this.router.navigateByUrl('**', { skipLocationChange: true }).then();

        throw error;
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.getCollectionPath().pipe(
      switchMap((recipesPath) =>
        this.firebaseFirestoreService.deleteOne([...recipesPath, id])
      )
    );
  }

  private getCollectionPath(): Observable<string[]> {
    return this.authService.user$.pipe(
      first(),
      map((user) => {
        return [
          this.authService.USERS_COLLECTION_NAME,
          user?.id as string,
          this.RECIPES_COLLECTION_NAME,
        ];
      })
    );
  }
}
