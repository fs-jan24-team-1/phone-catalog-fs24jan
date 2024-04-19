import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Product } from '../../types/Product';
import styles from './cartPage.module.scss';
import { CartItem } from '../../components/CartIem';
import { ButtonPrimary } from '../../components/UI/ButtonPrimary';

export const CartPage = () => {
  let products = useSelector((state: RootState) => state.product.cart);
  products = products.filter(
    (product: Product) =>
      product.category === 'phones' ||
      product.category === 'accessories' ||
      product.category === 'tablets',
  );

  //Need to DELETE or RECREATE this temp function
  const tempFunction = () => { return 0; };

  return (
    <>
      <h1 className="title">Cart</h1>

      <div className={styles.container}>
        <div className={styles.container__products}>
          {products.map((product: Product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>

        <div className={styles.totalCost}>
          <strong className={styles.totalCost__price}>$2657</strong>
          <p className={styles.totalCost__itemCount}>Total for 3 items</p>
          <div className={styles.totalCost__line}></div>
          <ButtonPrimary
            textForPrimaryButton="Checkout"
            callback={tempFunction}
          />
        </div>
      </div>
    </>
  );
};
