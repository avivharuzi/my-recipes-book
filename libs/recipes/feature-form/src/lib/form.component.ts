import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import {
  CreateOrUpdateRecipe,
  Recipe,
} from '@my-recipes-book/recipes/data-access';
import { markAllAsDirty } from '@my-recipes-book/shared/util-form-helpers';
import {
  FormValidators,
  getCommonImageValidators,
} from '@my-recipes-book/shared/util-form-validators';

@Component({
  selector: 'recipes-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  @Input() recipe: Recipe | null = null;

  @Output() recipeFormSubmit = new EventEmitter<CreateOrUpdateRecipe>();
  @Output() recipeDelete = new EventEmitter<void>();

  recipeForm = this.formBuilder.group({
    title: [null, [FormValidators.required, FormValidators.maxLength(128)]],
    description: [
      null,
      [FormValidators.required, FormValidators.maxLength(255)],
    ],
    ingredients: [null, [FormValidators.required]],
    directions: [null, [FormValidators.required]],
    coverImage: [[], [FormValidators.required, ...getCommonImageValidators()]],
    preparationTime: [null, [FormValidators.required, FormValidators.min(0)]],
    cookingTime: [null, [FormValidators.required, FormValidators.min(0)]],
    servingsAmount: [null, [FormValidators.required, FormValidators.min(0)]],
  });

  coverImagePreview: string | null = null;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.updateRecipeFormByRecipe();
    this.coverImageFormControl.valueChanges.subscribe((value) => {
      if (value && value.length > 0 && this.coverImageFormControl.valid) {
        this.coverImagePreview = URL.createObjectURL(value[0]);
      } else {
        this.coverImagePreview = null;
      }
    });
  }

  get coverImageFormControl(): FormControl {
    return this.recipeForm.get('coverImage') as FormControl;
  }

  onSubmit(): void {
    markAllAsDirty(Object.values(this.recipeForm.controls));

    if (this.recipeForm.invalid) {
      return;
    }

    const recipeFormValue = { ...this.recipeForm.value };
    recipeFormValue.ingredients = recipeFormValue.ingredients.split(/\r?\n/);
    recipeFormValue.directions = recipeFormValue.directions.split(/\r?\n/);
    recipeFormValue.preparationTime = +recipeFormValue.preparationTime;
    recipeFormValue.cookingTime = +recipeFormValue.cookingTime;
    recipeFormValue.servingsAmount = +recipeFormValue.servingsAmount;
    recipeFormValue.coverImage =
      recipeFormValue.coverImage && recipeFormValue.coverImage.length > 0
        ? recipeFormValue.coverImage[0]
        : this.recipe?.coverImage;

    const body: CreateOrUpdateRecipe = recipeFormValue;

    this.recipeFormSubmit.emit(body);
  }

  private updateRecipeFormByRecipe(): void {
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

    this.recipeForm.patchValue({
      title,
      description,
      ingredients: ingredients.join('\r\n'),
      directions: directions.join('\r\n'),
      preparationTime,
      cookingTime,
      servingsAmount,
    });

    this.coverImageFormControl.setValidators([...getCommonImageValidators()]);
  }
}
