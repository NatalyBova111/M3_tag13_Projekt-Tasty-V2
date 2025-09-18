import { Link } from 'react-router-dom';
import type { Category } from '../../types';
import './Cards.css';

export default function CategoryCard({ c }: { c: Category }) {
  return (
    <Link to={`/category/${encodeURIComponent(c.strCategory)}`} className="card category">
      <span className="cardTitle">{c.strCategory}</span>
      <div className="cardImage">
        <img src={c.strCategoryThumb} alt={c.strCategory} />
      </div>
    </Link>
  );
}
