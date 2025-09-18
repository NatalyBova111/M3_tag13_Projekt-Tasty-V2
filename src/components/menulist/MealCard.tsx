import { Link } from 'react-router-dom';
import type { MealThumb } from '../../types';
import './Cards.css';


export default function MealCard({ m }: { m: MealThumb }){
return (
<Link to={`/meal/${m.idMeal}`} className="card meal">
<img src={m.strMealThumb} alt={m.strMeal} />
<span>{m.strMeal}</span>
</Link>
);
}