import { RootState } from '../../store/store';
import { Product } from '../../types/Product';
import styles from './cartPage.module.scss';
import { CartItem } from '../../components/CartIem';
import { ButtonPrimary } from '../../components/UI/ButtonPrimary';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ButtonBack } from '../../components/UI/ButtonBack';


export const CartPage = () => {
  const { cart, cartTotalAmount, cartTotalQuantity } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'product/getTotals' });
  }, [cart, dispatch]);

  //Need to DELETE or RECREATE this temp function
  const tempFunction = () => {
    return 0;
  };

  return (
    <>
      <ButtonBack textForBackButton={`Back`} />
      <h1 className="title">Cart</h1>
      {cartTotalQuantity === 0 ? (
        <p>Ваш кошик пустий
        </p>) : (
          <div className={styles.container}>
          <div className={styles.container__products}>
            {cart.map((product: Product) => (
              <CartItem
                key={product.id}
                product={product}
              />
            ))}
          </div>

          <div className={styles.totalCost}>
            <strong className={styles.totalCost__price}>{`$${cartTotalAmount}`}</strong>
            <p className={styles.totalCost__itemCount}>
              Total for {cartTotalQuantity} {cartTotalQuantity > 1 ? 'items' : 'item'}
            </p>
            <div className={styles.totalCost__line}></div>
            <ButtonPrimary
              textForPrimaryButton="Checkout"
              callback={tempFunction} // щось додати
            />
          </div>
        </div>

      )}

    </>
  );
};
