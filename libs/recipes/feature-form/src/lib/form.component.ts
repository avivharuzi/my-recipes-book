import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Recipe } from '@my-recipes-book/recipes/data-access';

@Component({
  selector: 'recipes-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  @Input() recipe: Recipe | null = null;

  @Output() recipeFormSubmit = new EventEmitter<Recipe>();

  recipeForm = this.formBuilder.group({
    title: [null],
    description: [null],
    ingredients: [null],
    directions: [null],
    preparationTime: [null],
    cookingTime: [null],
    servingsAmount: [null],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.updateRecipeFormByRecipe();
  }

  updateRecipeFormByRecipe(): void {
    if (!this.recipe) {
      return;
    }

    const {
      title,
      description,
      ingredients,
      directions,
      preparationTime,
      cookingTime,
      servingsAmount,
    } = this.recipe;

    this.recipeForm.setValue({
      title,
      description,
      ingredients,
      directions,
      preparationTime,
      cookingTime,
      servingsAmount,
    });
  }

  onSubmit(): void {
    if (this.recipeForm.invalid) {
      return;
    }

    this.recipeFormSubmit.emit(this.recipeForm.value);
  }
}
