import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, first, map, Observable, of, switchMap } from 'rxjs';

import { AuthService } from '@my-recipes-book/shared/data-access-auth';
import {
  FirebaseFirestoreModel,
  FirebaseFirestoreService,
  FirebaseStorageService,
  FirebaseTimestamp,
} from '@my-recipes-book/shared/util-firebase';

import {
  CreateRecipe,
  Recipe,
  RecipeCoverImage,
  UpdateRecipe,
} from '../entities';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly RECIPES_COLLECTION_NAME = 'recipes';
  private readonly RECIPES_IMAGES_PATH = `images/${this.RECIPES_COLLECTION_NAME}`;

  constructor(
    private authService: AuthService,
    private firebaseFirestoreService: FirebaseFirestoreService,
    private firebaseStorageService: FirebaseStorageService,
    private router: Router
  ) {}

  create(createRecipe: CreateRecipe): Observable<string> {
    console.log('createRecipe: ', createRecipe);
    return this.getCollectionPath().pipe(
      switchMap((path) => {
        return this.uploadCoverImage(createRecipe.coverImageFile).pipe(
          switchMap((coverImage) => {
            console.log('coverImage: ', coverImage);
            const data = {
              ...createRecipe.recipe,
              ...coverImage,
              updatedAt:
                this.firebaseFirestoreService.getServerTimestamp() as FirebaseTimestamp,
              createdAt:
                this.firebaseFirestoreService.getServerTimestamp() as FirebaseTimestamp,
            };
            console.log('data: ', data);
            return this.firebaseFirestoreService.addOne<Recipe>(path, data);
          })
        );
      })
    );
  }

  update(id: string, updateRecipe: UpdateRecipe): Observable<void> {
    return this.getCollectionPath().pipe(
      switchMap((path) => {
        let coverImage$: Observable<RecipeCoverImage>;

        const coverImageFile = updateRecipe.coverImageFile;
        if (coverImageFile) {
          coverImage$ = this.firebaseStorageService
            .deleteFile(updateRecipe.recipe.coverImagePath)
            .pipe(switchMap(() => this.uploadCoverImage(coverImageFile)));
        } else {
          coverImage$ = of({
            coverImagePath: updateRecipe.recipe.coverImagePath,
            coverImageURL: updateRecipe.recipe.coverImageURL,
          });
        }

        return coverImage$.pipe(
          switchMap((coverImage) => {
            return this.firebaseFirestoreService.updateOne<Recipe>(
              [...path, id],
              {
                ...updateRecipe.recipe,
                ...coverImage,
                updatedAt:
                  this.firebaseFirestoreService.getServerTimestamp() as FirebaseTimestamp,
              }
            );
          })
        );
      })
    );
  }

  getAll(): Observable<FirebaseFirestoreModel<Recipe>[]> {
    return this.getCollectionPath().pipe(
      switchMap((path) =>
        this.firebaseFirestoreService.getMany<Recipe>(
          path,
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
      switchMap((path) =>
        this.firebaseFirestoreService.getOne<Recipe>([...path, id])
      )
    );
  }

  getDetailFromRoute(
    id$: Observable<string | null>
  ): Observable<FirebaseFirestoreModel<Recipe>> {
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
      switchMap((path) => {
        return this.getDetail(id).pipe(
          switchMap((recipe) => {
            if (!recipe) {
              throw new Error('Not found recipe to delete');
            }
            return this.firebaseStorageService.deleteFile(
              recipe.coverImagePath
            );
          }),
          switchMap(() =>
            this.firebaseFirestoreService.deleteOne([...path, id])
          )
        );
      })
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

  private uploadCoverImage(coverImage: File): Observable<RecipeCoverImage> {
    const filePath = this.firebaseStorageService.getUniquePathFromFile(
      this.RECIPES_IMAGES_PATH,
      coverImage
    );
    return this.firebaseStorageService.uploadFile(filePath, coverImage).pipe(
      switchMap((uploadResult) => {
        const fullPath = uploadResult.metadata.fullPath;
        return this.firebaseStorageService.getFileURL(fullPath).pipe(
          map((fileURL) => {
            return {
              coverImageURL: fileURL,
              coverImagePath: fullPath,
            };
          })
        );
      })
    );
  }
}
