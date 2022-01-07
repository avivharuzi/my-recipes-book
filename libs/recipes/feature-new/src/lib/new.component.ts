import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { finalize } from 'rxjs';

import {
  CreateRecipe,
  RecipeService,
  UpdateRecipe,
} from '@my-recipes-book/recipes/data-access';

@Component({
  selector: 'recipes-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewComponent {
  isLoading = false;

  constructor(
    private readonly recipeService: RecipeService,
    private router: Router
  ) {}

  onRecipeFormSubmit(recipe: CreateRecipe | UpdateRecipe): void {
    this.isLoading = true;
    this.recipeService
      .create(recipe as CreateRecipe)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(() => {
        this.router.navigate(['/recipes']).then();
      });
  }
}
