import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import SearchBar from '../search/SearchBar';     
import logoUrl from '../../assets/tasty-logo.png';    
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';

  const onSubmit = (value: string) => {
    const v = value.trim();
    setParams(v ? { q: v } : {});
    navigate(v ? `/?q=${encodeURIComponent(v)}` : '/');
  };

  return (
    <header className="header">
      <div className="header__inner">
<Link to="/" aria-label="Go to home">
  <img src={logoUrl} alt="Tasty" className="logoImg" width={181} height={125} />
</Link>

        <h1 className="heroTitle">Find a recipe, an idea, an inspiration…</h1>

        <SearchBar defaultValue={q} onSubmit={onSubmit} />
      </div>
    </header>
  );
}
