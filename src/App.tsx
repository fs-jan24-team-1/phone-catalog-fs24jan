import './App.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div data-cy="app">
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
