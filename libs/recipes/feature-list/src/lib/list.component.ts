import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RecipeService } from '@my-recipes-book/recipes/data-access';

@Component({
  selector: 'recipes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  recipes$ = this.recipesService.getAll();

  constructor(private readonly recipesService: RecipeService) {}
}
