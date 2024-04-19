/* eslint-disable react/react-in-jsx-scope */
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductCard } from './components/ProductCard';
import { TabletsPage } from './pages/TabletsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { PhonesPage } from './pages/PhonesPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CartPage } from './pages/CartPage';
import { useRef } from 'react';
import { ProductItemPage } from './pages/ProductItemPage';

export const Root = () => {
  const scrollToTopRef = useRef<HTMLDivElement | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App scrollToTopRef={scrollToTopRef} />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/phones" element={<PhonesPage />}></Route>
          <Route path="/phones/:productId" element={<ProductItemPage />}></Route>

          <Route path="/tablets" element={<TabletsPage />}></Route>
          <Route path="/tablets/:productId" element={<ProductItemPage />}></Route>


          <Route path="/accessories" element={<AccessoriesPage />}></Route>
          <Route path="/accessories/:productId" element={<ProductItemPage />}></Route>

          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
