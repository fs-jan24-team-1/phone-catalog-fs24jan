import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Product } from './types/Product';
import { useEffect, useState } from 'react';
import { getProducts } from './api';

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(items => {
      setProducts(items);
    });
  }, []);

  return (
    <div data-cy="app" className="wrapper">
      <Header />

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};
