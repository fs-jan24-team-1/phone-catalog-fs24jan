import React, { FC, useMemo } from 'react';
import { RootState } from 'store/store';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Variants, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Product, ProductButtonType } from 'types';
import styles from './productCard.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonPrimary } from 'components/UI/ButtonPrimary';
import { ButtonFavourite } from 'components/UI/ButtonFavourite';
import { getImageUrl } from 'utils/urlUtils';
import useInViewOnce from './../../hooks/useInViewOnce';

type Props = {
  product: Product;
};

export const ProductCard: FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const [t] = useTranslation('global');
  const favourites = useSelector(
    (state: RootState) => state.product.favourites,
  );
  const cart = useSelector((state: RootState) => state.product.cart);
  const location = useLocation();

  const isProductInFavourites = favourites.some(
    (favProduct: Product) => favProduct.id === product.id,
  );

  const isProductInCart = cart.some(
    (cartProduct: Product) => cartProduct.id === product.id,
  );

  const handleAddToFavourites = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
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

  const url = useMemo(() => {
    const basePath = `/${product.category}`;
    const productPath = `/${product.itemId}`;
    const currentPath = location.pathname;

    const pathSegments = currentPath.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    if (
      lastSegment &&
      lastSegment !== product.category &&
      !lastSegment.includes(product.category)
    ) {
      return `${basePath}${productPath}`;
    }

    return `${basePath}${productPath}`;
  }, [location.pathname, product.category, product.itemId]);

  const cardVariants: Variants = {
    offscreen: {
      y: 50,
    },
    onscreen: {
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.1,
        duration: 0.4,
      },
    },
  };

  const [ref, inView] = useInViewOnce({ threshold: 0 });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial={!inView ? 'onscreen' : 'offscreen'}
      animate={inView ? 'onscreen' : 'offscreen'}
    >
      <Link to={url} style={{ textDecoration: 'none', color: 'black' }}>
        <article className={styles.wrapper}>
          <div className={styles.product}>
            <div className={styles.product__image}>
              <img
                className={styles.product__image_img}
                src={getImageUrl(product.image)}
                alt={product.name}
              />
            </div>

            <div className={`${styles.product_details} ${styles.details}`}>
              <h3 className={styles.details__name}>{product.name}</h3>

              <div className={`${styles.details__price} ${styles.price}`}>
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
                <span className={styles.info__title}>
                  {t('product.Screen')}
                </span>
                <span className={styles.info__value}>{product.screen}</span>
              </div>

              <div className={styles.description__container}>
                <span className={styles.info__title}>
                  {t('product.Capacity')}
                </span>
                <span className={styles.info__value}>{product.capacity}</span>
              </div>

              <div className={styles.description__container}>
                <span className={styles.info__title}>{t('product.RAM')}</span>
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
