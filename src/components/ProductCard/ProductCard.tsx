import React from 'react';
import { Product } from '../../types/Product';
import styles from './productCard.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonPrimary } from '../UI/ButtonPrimary';
import { RootState } from '../../store/store';
import { ButtonFavourite } from '../UI/ButtonFavourite';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductButtonType } from '../../types/ProductButtonType';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.product.favourites);
  const cart = useSelector((state: RootState) => state.product.cart);

  const isProductInFavourites = favourites.some(
    (favProduct: Product) => favProduct.id === product.id,
  );

  const isProductInCart = cart.some(
    (cartProduct: Product) => cartProduct.id === product.id,
  );

  const handleAddToFavourites = () => {
    if (isProductInFavourites) {
      toast.success('The product has been removed');

      dispatch({
        type: 'product/removeFromFavourites',
        payload: product,
      });
    } else {
      toast.success('The product has been added');

      dispatch({
        type: 'product/addToFavourites',
        payload: product,
      });
    }
  };

  const handleAddToCart = () => {
    if (isProductInCart) {
      toast.success('The product has been removed');

      dispatch({
        type: 'product/removeFromCart',
        payload: product,
      });
    } else {
      toast.success('The product has been added');

      dispatch({
        type: 'product/addToCart',
        payload: product,
      });
    }
  };

  const { pathname } = useLocation();
  const url =
    pathname !== `/${product.category}`
      ? `../${product.category}/${product.itemId}`
      : `./${product.itemId}`;

  return (
    <Link
      to={url}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <article className={styles.wrapper}>
        <div className={styles.productCard}>
          <div className={styles.productImageContainer}>
            <img
              className={styles.productImage}
              src={product.image}
              alt={product.name}
            />
          </div>

          <div className={styles.productDetails}>
            <h3 className={styles.productName}>{product.name}</h3>

            <div className={styles.productPrice}>
              <div className={styles.productDiscount}>${product.price}</div>

              {product.fullPrice && (
                <div className={styles.productFullPrice}>
                  ${product.fullPrice}
                </div>
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

          <div className={styles.buttonBox} >
            <ButtonPrimary
              textForPrimaryButton={
                isProductInCart ? ProductButtonType.ADDED : ProductButtonType.ADD
              }
              callback={handleAddToCart}
            />
            <ButtonFavourite callback={handleAddToFavourites} />
          </div>
        </div>
      </article>
    </Link>
  );
};
