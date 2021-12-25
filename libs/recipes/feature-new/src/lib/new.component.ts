import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  CreateOrUpdateRecipe,
  RecipeService,
} from '@my-recipes-book/recipes/data-access';

@Component({
  selector: 'recipes-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewComponent {
  constructor(private readonly recipeService: RecipeService) {}

  onRecipeFormSubmit(recipe: CreateOrUpdateRecipe): void {
    this.recipeService.create(recipe).subscribe();
  }
}
