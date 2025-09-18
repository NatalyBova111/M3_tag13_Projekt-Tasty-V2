import type { Category, MealThumb, MealDetail } from '../types';


const BASE = 'https://www.themealdb.com/api/json/v1/1';


export async function getCategories(): Promise<Category[]> {
const res = await fetch(`${BASE}/categories.php`);
const data = await res.json();
return data.categories as Category[];
}


export async function searchMealsByName(q: string): Promise<MealThumb[]> {
  if (!q) return [];
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(q)}`);
  const data = await res.json();
  return (data.meals || []).map(
    (m: { idMeal: string; strMeal: string; strMealThumb: string }) => ({
      idMeal: m.idMeal,
      strMeal: m.strMeal,
      strMealThumb: m.strMealThumb,
    })
  );
}


export async function getMealsByCategory(category: string): Promise<MealThumb[]> {
const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
const data = await res.json();
return (data.meals || []) as MealThumb[];
}


export async function getMealById(id: string): Promise<MealDetail | null> {
const res = await fetch(`${BASE}/lookup.php?i=${encodeURIComponent(id)}`);
const data = await res.json();
return (data.meals && data.meals[0]) || null;
}