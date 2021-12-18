import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecipeService } from '@my-recipes-book/recipes/data-access';
import { map } from 'rxjs';

@Component({
  selector: 'recipes-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {
  recipe$ = this.recipeService.getDetailFromRoute(
    this.activatedRoute.paramMap.pipe(map((paramMap) => paramMap.get('id')))
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private recipeService: RecipeService
  ) {}
}
