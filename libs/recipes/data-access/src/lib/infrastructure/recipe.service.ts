import { Injectable } from '@angular/core';

import { AuthService } from '@my-recipes-book/shared/data-access-auth';
import {
  FirebaseFirestoreModel,
  FirebaseFirestoreService,
} from '@my-recipes-book/shared/util-firebase';
import { first, map, Observable, switchMap } from 'rxjs';
import { Recipe } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly RECIPES_COLLECTION_NAME = 'recipes';

  constructor(
    private authService: AuthService,
    private firebaseFirestoreService: FirebaseFirestoreService
  ) {}

  createRecipe(recipe: Recipe): Observable<string> {
    return this.getRecipesPath().pipe(
      switchMap((recipesPath) =>
        this.firebaseFirestoreService.addOne<Recipe>(recipesPath, recipe)
      )
    );
  }

  updateRecipe(recipe: Recipe): Observable<void> {
    return this.getRecipesPath().pipe(
      switchMap((recipesPath) =>
        this.firebaseFirestoreService.updateOne<Recipe>(recipesPath, recipe)
      )
    );
  }

  getRecipes(): Observable<FirebaseFirestoreModel<Recipe>[]> {
    return this.getRecipesPath().pipe(
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

  deleteRecipe(id: string): Observable<void> {
    return this.getRecipesPath().pipe(
      switchMap((recipesPath) =>
        this.firebaseFirestoreService.deleteOne([...recipesPath, id])
      )
    );
  }

  private getRecipesPath(): Observable<string[]> {
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
