import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Product } from '../../types/Product';
import styles from './cartPage.module.scss';
import { CartItem } from '../../components/CartIem';
import { ButtonPrimary } from '../../components/UI/ButtonPrimary';
import { useState } from 'react';

export const CartPage = () => {
  let products = useSelector((state: RootState) => state.product.cart);
  
  // Create variebles for product.category === 'phones' ||...
  products = products.filter(
    (product: Product) =>
      product.category === 'phones' ||
      product.category === 'accessories' ||
      product.category === 'tablets',
  );

  //Need to DELETE or RECREATE this temp function
  const tempFunction = () => {
    return 0;
  };

  const [getFullPrice, setGetFullPrice] = useState(0);

  const handleUpdateFullPrice = (price: number) => {
    setGetFullPrice(prevPrice => prevPrice + price);
  };

  return (
    <>
      <h1 className="title">Cart</h1>

      <div className={styles.container}>
        <div className={styles.container__products}>
          {products.map((product: Product) => (
            <CartItem
              key={product.id}
              product={product}
              setGetFullPrice={handleUpdateFullPrice}
            />
          ))}
        </div>

        <div className={styles.totalCost}>
          <strong className={styles.totalCost__price}>${getFullPrice}</strong>
          <p className={styles.totalCost__itemCount}>
            Total for {products.length} {products.length > 1 ? 'items' : 'item'}
          </p>
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
