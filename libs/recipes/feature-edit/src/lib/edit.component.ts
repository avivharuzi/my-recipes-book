import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Recipe, RecipeService } from '@my-recipes-book/recipes/data-access';
import { map } from 'rxjs';

@Component({
  selector: 'recipes-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {
  recipe$ = this.recipeService.getDetailFromRoute(
    this.activatedRoute.paramMap.pipe(map((paramMap) => paramMap.get('id')))
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  onRecipeFormSubmit(updatedRecipe: Recipe, id: string) {
    this.recipeService.update(id, updatedRecipe).subscribe();
  }
}
