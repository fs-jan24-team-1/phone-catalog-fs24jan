import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Product } from '../../types/Product';
import styles from './cartPage.module.scss';
import { CartItem } from '../../components/CartIem';

export const CartPage = () => {
  let products = useSelector((state: RootState) => state.product.cart);
  products = products
    .filter((product: Product) => product.category === 'phones')

  return (
    <div className={styles.container}>
      <h1 className="title">Cart</h1>

      {products.map((product: Product) => (
        <CartItem key={product.id} product={product} />
      ))}
    </div>
  );
};
