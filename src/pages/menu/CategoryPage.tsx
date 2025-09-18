import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MealCard from '../../components/menulist/MealCard';
import { getMealsByCategory } from '../../services/api';
import type { MealThumb } from '../../types';



export default function CategoryPage(){
const { category = '' } = useParams(); 
const [meals, setMeals] = useState<MealThumb[]>([]);
const [loading, setLoading] = useState(true);


useEffect(() => {
async function run(){
setLoading(true);
const m = await getMealsByCategory(category);
setMeals(m);
setLoading(false);
}
run();
}, [category]);


return (
  <section>
   <h2 className="sectionTitle bigTitle">Everything {decodeURIComponent(category)}</h2>
    {loading ? (
      <p>Loading…</p>
    ) : (
      <div className="grid grid--two">
        {meals.map(m => <MealCard key={m.idMeal} m={m} />)}
      </div>
    )}
  </section>
);
}