import './app.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useEffect } from 'react';
import { getProducts } from './api';
import { useDispatch } from 'react-redux';
import { MessageContainer } from "./components/UI/MessageNotification";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const items = await getProducts();
        dispatch({
          type: 'product/setProducts',
          payload: items,
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div data-cy="app" className="wrapper">
      <MessageContainer />

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
