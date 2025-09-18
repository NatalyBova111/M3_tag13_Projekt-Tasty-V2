import { useCallback } from 'react';
import './SearchBar.css';

type Props = {
  defaultValue?: string;
  onSubmit: (q: string) => void;
};

export default function SearchBar({ defaultValue = '', onSubmit }: Props) {
  const handle = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const q = String(form.get('q') ?? '').trim();
    onSubmit(q);
  }, [onSubmit]);

  return (
    <form className="searchBar" onSubmit={handle} role="search">
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Type something to search"
        aria-label="Search recipes"
        autoComplete="off"
        inputMode="search"
      />
      <button type="submit">Search</button>
    </form>
  );
}
