import { RootState } from '../../store/store';
import { Product } from '../../types/Product';
import styles from './cartPage.module.scss';
import { CartItem } from '../../components/CartIem';
import { ButtonPrimary } from '../../components/UI/ButtonPrimary';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ButtonBack } from '../../components/UI/ButtonBack';
import { LottieAnimation } from '../../components/UI/LottieAnimation';
import * as animationData from '../../EmptyCart.json';
import { Link } from 'react-router-dom';


export const CartPage = () => {
  const { cart, cartTotalAmount, cartTotalQuantity } = useSelector(
    (state: RootState) => state.product,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'product/getTotals' });
  }, [cart, dispatch]);

  //Need to DELETE or RECREATE this temp function
  const tempFunction = () => {
    return 0;
  };

  return (
    <div className={styles.container}>
      <ButtonBack textForBackButton={`Back`} />

      <h1 className={styles.title}>Cart</h1>

      {cartTotalQuantity === 0 ? (
        <div className={styles.container__empty__cart}>
          <h1 style={{textAlign: 'center'}}>{`Your cart is empty :(`}</h1>
          <LottieAnimation animationData={animationData} />
          <Link to="/" className={styles.button}>
          Сontinue shopping
      </Link>
        </div>

      ) : (
        <div className={styles.wrapper}>
          <div className={styles.wrapper__products}>
            {cart.map((product: Product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>

          <div className={styles.totalCost}>
            <strong
              className={styles.totalCost__price}
            >{`$${cartTotalAmount}`}</strong>
            <p className={styles.totalCost__itemCount}>
              Total for {cartTotalQuantity}{' '}
              {cartTotalQuantity > 1 ? 'items' : 'item'}
            </p>
            <div className={styles.totalCost__line}></div>
            <ButtonPrimary
              textForPrimaryButton="Checkout"
              callback={tempFunction}
            />
          </div>
        </div>
      )}
    </div>
  );
};
