import React from 'react';
import styles from './cartItem.module.scss';
import { Product } from '../../types/Product';
import { ButtonSlider } from '../UI/ButtonSlider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const cart = useSelector((state: RootState) => state.product.cart);
  const dispatch = useDispatch();

  const cartItem: Product = cart.find(
    (item: Product) => item.id === product.id,
  );

  const handleRemoveFromCart = () => {
    dispatch({
      type: 'product/removeFromCart',
      payload: product,
    });
  };

  const handleDeacreaseQuantity = () => {
    dispatch({
      type: 'product/decreaseCart',
      payload: product,
    });
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'product/addToCart',
      payload: product,
    });
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__column1}>
        <button
          className={styles.cartItem__close}
          onClick={handleRemoveFromCart}
        ></button>

        <div className={styles.cartItem__image}>
          <img
            className={styles.cartItem__productImage}
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className={styles.cartItem__description}>
          <span className={styles.cartItem__name}>{product.name}</span>
        </div>
      </div>

      <div className={styles.cartItem__column2}>
        <div className={styles.cartItem__button}>
          <ButtonSlider
            iconType={'minus'}
            handleClick={() => handleDeacreaseQuantity()}
            disabled={product.quantity === 1}
          />
          <span className={styles.cartItem__count}>{cartItem.quantity}</span>
          <ButtonSlider
            iconType={'plus'}
            handleClick={() => handleAddToCart()}
          />
        </div>

        <span
          className={styles.cartItem__price}
        >{`$${product.price * product.quantity}`}</span>
      </div>
    </div>
  );
};
