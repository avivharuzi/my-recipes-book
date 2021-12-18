import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Recipe, RecipeService } from '@my-recipes-book/recipes/data-access';

@Component({
  selector: 'recipes-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewComponent {
  constructor(private readonly recipeService: RecipeService) {}

  onRecipeFormSubmit(recipe: Recipe): void {
    this.recipeService.create(recipe).subscribe();
  }
}
