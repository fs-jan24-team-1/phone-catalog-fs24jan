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
import { Variants, motion } from 'framer-motion';

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

  const handleAddToFavourites = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

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

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

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

  const cardVariants: Variants = {
    offscreen: {
      y: 100,
    },
    onscreen: {
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Link to={url} style={{ textDecoration: 'none', color: 'black' }}>
        <article className={styles.wrapper}>
          <div className={styles.product}>
            <div className={styles.product__image}>
              <img
                className={styles.product__image_img}
                src={product.image}
                alt={product.name}
              />
            </div>

            <div className={`${styles.product_details} ${styles.details}`}>
              <h3 className={styles.details__name}>{product.name}</h3>

              <div className={styles.details__price}>
                <div className={styles.price__discount}>${product.price}</div>

                {product.fullPrice && (
                  <div className={styles.price__full}>${product.fullPrice}</div>
                )}
              </div>
            </div>

            <div className={styles.underline}></div>

            <div className={styles.description}>
              <div
                className={`${styles.description__container} ${styles.info}`}
              >
                <span className={styles.info__title}>Screen</span>
                <span className={styles.info__value}>{product.screen}</span>
              </div>

              <div className={styles.description__container}>
                <span className={styles.info__title}>Capacity</span>
                <span className={styles.info__value}>{product.capacity}</span>
              </div>

              <div className={styles.description__container}>
                <span className={styles.info__title}>RAM</span>
                <span className={styles.info__value}>{product.ram}</span>
              </div>
            </div>

            <div className={styles.buttons__container}>
              <ButtonPrimary
                textForPrimaryButton={
                  isProductInCart
                    ? ProductButtonType.ADDED
                    : ProductButtonType.ADD
                }
                callback={handleAddToCart}
              />
              <ButtonFavourite
                product={product}
                callback={handleAddToFavourites}
              />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};
