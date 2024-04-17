import React from 'react';
import { Product } from '../../types/Product';
import styles from './productCard.module.scss';
import { useDispatch } from 'react-redux';

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
    <div className={styles.productCard}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.productImage}
      />
      <div className={styles.productDetails}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productPrice}>Price: ${product.price}</p>
      </div>

      <button
        onClick={handleAddToFavourites}
        className={styles.addToFavourites}
      >
        Add to favourites
      </button>
      <button
        onClick={handleRemoveFromFavourites}
        className={styles.addToFavourites}
      >
        Remove from favourites
      </button>
    </div>
  );
};
