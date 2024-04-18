import React from 'react';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { useDispatch } from 'react-redux';
import { ButtonPrimary } from '../UI/ButtonPrimary';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToFavourites = () => {
    dispatch({
      type: 'product/addToFavourites',
      payload: product,
    });
  };

  const handleRemoveFromFavourites = () => {
    dispatch({
      type: 'product/removeFromFavourites',
      payload: product,
    });
  };

  return (
    <article className={styles.wrapper}>
      <div className={styles.productCard}>
        <img
          className={styles.productImage}
          src={product.image}
          alt={product.name}
        />

        <div className={styles.productDetails}>
          <h3 className={styles.productName}>{product.name}</h3>

          <div className={styles.productPrice}>
            <div className={styles.productFullPrice}>${product.fullPrice}</div>

            {product.price && (
              <div className={styles.productDiscount}>${product.price}</div>
            )}
          </div>
        </div>

        <div className={styles.underline}></div>

        <div className={styles.productDescription}>
          <div className={styles.productDescriptionBox}>
            <span className={styles.productDescriptionTitle}>Screen</span>
            <span className={styles.productDescriptionValue}>
              {product.screen}
            </span>
          </div>

          <div className={styles.productDescriptionBox}>
            <span className={styles.productDescriptionTitle}>Capacity</span>
            <span className={styles.productDescriptionValue}>
              {product.capacity}
            </span>
          </div>

          <div className={styles.productDescriptionBox}>
            <span className={styles.productDescriptionTitle}>RAM</span>
            <span className={styles.productDescriptionValue}>
              {product.ram}
            </span>
          </div>
        </div>

        <div className={styles.buttonBox}>
          <ButtonPrimary textForPrimaryButton='PrimaryText' />

          <button>F</button>
        </div>
      </div>
    </article>
  );
};
