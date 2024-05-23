import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TabletsPage } from './pages/TabletsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { PhonesPage } from './pages/PhonesPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { CartPage } from './pages/CartPage';
import { ProductItemPage } from './pages/ProductItemPage';
import { ContactsPage } from './pages/ContactsPage';
import { RightsPage } from 'pages/RightsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
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
        <Route path="/contacts" element={<ContactsPage />} />
         <Route path="/rights" element={<RightsPage />}/>
      </Route>
    </Routes>
  </Router>
);
