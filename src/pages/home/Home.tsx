import { useEffect, useMemo, useReducer, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryCard from '../../components/menulist/CategoryCard';
import MealCard from '../../components/menulist/MealCard';
import { getCategories, searchMealsByName } from '../../services/api';
import type { Category, MealThumb } from '../../types';
import './Home.css';

type State = { loading: boolean; results: MealThumb[]; error: string | null };
type Action =
  | { type: 'START' }
  | { type: 'SUCCESS'; payload: MealThumb[] }
  | { type: 'ERROR'; payload: string }
  | { type: 'CLEAR' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'START':
      return { ...state, loading: true, error: null };
    case 'SUCCESS':
      return { loading: false, results: action.payload, error: null };
    case 'ERROR':
      return { loading: false, results: [], error: action.payload };
    case 'CLEAR':
      return { loading: false, results: [], error: null };
    default:
      return state; // <-- добавлено
  }
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    results: [],
    error: null,
  });

  const [params] = useSearchParams();
  const q = params.get('q') ?? '';

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (!q) {
      dispatch({ type: 'CLEAR' });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        dispatch({ type: 'START' });
        const r = await searchMealsByName(q);
        if (!cancelled) dispatch({ type: 'SUCCESS', payload: r });
      } catch {
        if (!cancelled) dispatch({ type: 'ERROR', payload: 'Failed to load' });
      }
    })();
    return () => { cancelled = true; };
  }, [q]);

  const titleClass = q ? 'sectionTitle' : 'sectionTitle bigTitle';
  const heading = useMemo(
    () => (q ? `Results for "${q}"` : 'Or go through our categories'),
    [q]
  );

  return (
    <section>
      <h2 className={titleClass}>{heading}</h2>

      {q ? (
        state.loading ? (
          <p>Loading…</p>
        ) : state.error ? (
          <p className="muted">{state.error}</p>
        ) : state.results.length ? (
          <div className="grid">
            {state.results.map((m) => <MealCard key={m.idMeal} m={m} />)}
          </div>
        ) : (
          <p>No results. Try another search.</p>
        )
      ) : (
        <div className="grid grid--categories">
          {categories.map((c) => <CategoryCard key={c.idCategory} c={c} />)}
        </div>
      )}
    </section>
  );
}
