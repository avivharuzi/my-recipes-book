import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map } from 'rxjs';

import {
  CreateRecipe,
  RecipeService,
  UpdateRecipe,
} from '@my-recipes-book/recipes/data-access';

@Component({
  selector: 'recipes-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {
  isLoading = false;

  recipe$ = this.recipeService.getDetailFromRoute(
    this.activatedRoute.paramMap.pipe(map((paramMap) => paramMap.get('id')))
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  onRecipeFormSubmit(
    updatedRecipe: CreateRecipe | UpdateRecipe,
    id: string
  ): void {
    this.isLoading = true;
    this.recipeService
      .update(id, updatedRecipe as UpdateRecipe)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.router.navigate(['/recipes', id]).then();
      });
  }

  onRecipeDelete(id: string): void {
    this.isLoading = true;
    this.recipeService
      .delete(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.router.navigate(['/recipes']).then();
      });
  }
}
