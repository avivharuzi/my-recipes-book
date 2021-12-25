import { Recipe } from './recipe';

export type CreateOrUpdateRecipe = Recipe & {
  coverImage: File | string;
};
