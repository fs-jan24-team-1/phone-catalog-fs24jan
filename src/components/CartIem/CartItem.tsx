import React, { useEffect } from 'react';
import styles from './cartItem.module.scss';
import { Product } from '../../types/Product';
import { ButtonSlider } from '../UI/ButtonSlider';

type Props = {
  product: Product;
  setGetFullPrice: (value: number) => void;
};

export const CartItem: React.FC<Props> = ({ product, setGetFullPrice }) => {
  // useEffect(() => {
  //   setGetFullPrice(product.price);
  // }, [product.price, setGetFullPrice]);

  // const handleUpdatePrice = (price: number) => {
  //   setGetFullPrice(product.price * price);

  //   return price;
  // };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__column1}>
        <div className={styles.cartItem__icon}></div>
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
          <ButtonSlider iconType={'minus'} />
          <span className={styles.cartItem__count}>
            {1}
          </span>
          <ButtonSlider iconType={'plus'} />
        </div>

        <span className={styles.cartItem__price}>{`$${product.price}`}</span>
      </div>
    </div>
  );
};
