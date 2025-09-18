import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import CategoryPage from './pages/menu/CategoryPage';
import MealPage from './pages/meal/MealPage';
import NotFound from './pages/NotFound';


export default function App() {
return (
<div className="app">
<Header />
<main className="container">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/category/:category" element={<CategoryPage />} />
<Route path="/meal/:id" element={<MealPage />} />
<Route path="*" element={<NotFound />} />
</Routes>
</main>
<Footer />
</div>
);
}