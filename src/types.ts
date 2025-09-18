export type Category = {
idCategory: string;
strCategory: string;
strCategoryThumb: string;
strCategoryDescription: string;
};


export type MealThumb = {
idMeal: string;
strMeal: string;
strMealThumb: string;
};


export type MealDetail = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string | null;
} & Record<string, unknown>;