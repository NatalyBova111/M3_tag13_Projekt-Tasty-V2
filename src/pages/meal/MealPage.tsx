import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMealById } from '../../services/api';
import type { MealDetail } from '../../types';
import './MealPage.css';


export default function MealPage(){
const { id = '' } = useParams(); 
const [meal, setMeal] = useState<MealDetail | null>(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
async function run(){
setLoading(true);
const m = await getMealById(id);
setMeal(m);
setLoading(false);
}
run();
}, [id]);


const ingredients = useMemo(() => {
  if (!meal) return [];
  const obj = meal as Record<string, unknown>;
  const list: { name: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = String(obj[`strIngredient${i}`] ?? '').trim();
    const measure = String(obj[`strMeasure${i}`] ?? '').trim();
    if (name) list.push({ name, measure });
  }
  return list;
}, [meal]);


if (loading) return <p>Loading…</p>;
if (!meal) return <p>Not found.</p>;


return (
<article className="recipe">
<img className="heroImg" src={meal.strMealThumb} alt={meal.strMeal} />
<div className="recipe__content">
<div className="recipe__left">
<h2>{meal.strMeal}</h2>
<ul className="steps">
{meal.strInstructions.split(/\r?\n/).filter(Boolean).map((line, i) => (
<li key={i}>{line}</li>
))}
</ul>
</div>
<aside className="recipe__right">
<h3>Ingredients</h3>
<ul className="ingredients">
{ingredients.map((it, i) => (
<li key={i}><span>{it.name}</span> <em>{it.measure}</em></li>
))}
</ul>
{meal.strYoutube && (
<a className="yt" href={meal.strYoutube} target="_blank" rel="noreferrer">Watch on YouTube</a>
)}
</aside>
</div>
</article>
);
}