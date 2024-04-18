import './app.scss';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useEffect } from 'react';
import { getProducts } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';

export const App = () => {
  // const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  // const products = useSelector((state: RootState) => state.product.products);

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

  // useEffect(() => {
  //   console.log('Products from Redux state:', products);
  // }, [products]);

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
