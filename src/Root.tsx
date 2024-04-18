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

export const Root = () => {
  const scrollToTopRef = useRef<HTMLDivElement | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App scrollToTopRef={scrollToTopRef} />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/phones" element={<PhonesPage />}>
            {/* <Route path=":productId" element={<ProductCard />} /> */}
          </Route>

          <Route path="/tablets" element={<TabletsPage />}>
            {/* <Route path=":productId" element={<ProductCard />} /> */}
          </Route>

          <Route path="/accessories" element={<AccessoriesPage />}>
            {/* <Route path=":productId" element={<ProductCard />} /> */}
          </Route>

          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
