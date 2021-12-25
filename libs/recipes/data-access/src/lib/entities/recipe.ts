import { FirebaseTimestamp } from '@my-recipes-book/shared/util-firebase';

export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
  directions: string[];
  coverImage: string;
  preparationTime: number;
  cookingTime: number;
  servingsAmount: number;
  createdAt: FirebaseTimestamp;
  updatedAt: FirebaseTimestamp;
}
