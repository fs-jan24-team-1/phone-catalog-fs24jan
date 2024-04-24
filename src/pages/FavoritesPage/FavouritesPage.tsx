import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ProductCard } from '../../components/ProductCard';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './favouritesPage.module.scss';
import { LottieAnimation } from '../../components/UI/LottieAnimation';
import * as animationData from '../../animations/EmptyFavourites.json';
import { Link } from 'react-router-dom';
import { useScrollToTopEffect } from '../../utils/useScrollToTopEffect';
import { useTranslation } from 'react-i18next';

export const FavoritesPage = () => {
  const products = useSelector((state: RootState) => state.product.favourites);
  const numberOfItems = products.length;
  const [t] = useTranslation('global');

  useScrollToTopEffect();

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className={styles.title}>{t('favourites.Favourites')}</h1>
      <h3 className={styles.itemsLeft}>{numberOfItems} {t('favourites.items')}</h3>

      {products.length > 0 ? (
        <div className={styles.products}>
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <>
          <div className={styles.animation}>
            <LottieAnimation animationData={animationData} />
          </div>

          <p className={styles.message}>{t('favourites.There are no items yet')}</p>

          <Link to="/" className={styles['go-home-button']}>{t('favourites.GO HOME')}</Link>
        </>
      )}
    </div>
  );
};
