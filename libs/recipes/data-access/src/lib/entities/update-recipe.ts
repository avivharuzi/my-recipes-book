import { Recipe } from './recipe';

export interface UpdateRecipe {
  recipe: Recipe;
  coverImageFile: File | null;
}
