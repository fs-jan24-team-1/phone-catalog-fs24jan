import { FC, useEffect, useState } from 'react';
import styles from './catalog.module.scss';
import { Product } from 'types';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as animationData from 'animations/ProductsNotFound.json';
import { Filter } from 'components/Filter';
import { ProductCard } from 'components/ProductCard';
import { CardSkeleton } from 'components/ProductCardSkeleton';
import { LottieAnimation } from 'components/UI/LottieAnimation';
import { useSearchParams } from 'react-router-dom';

interface Props {
  products: Product[];
  totalProducts: number;
}

export const Catalog: FC<Props> = ({ products, totalProducts }) => {
  const [isLoading, setIsLoading] = useState(true);

  const { pathname } = useLocation();
  const [t] = useTranslation('global');

  const searchParams = useSearchParams();

  const isSearchPerformed = searchParams.toString().includes('query');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.section}>
      {isLoading && (
        <div className={styles.catalog}>
          <h3 className={styles.catalog__quantity}>
            {totalProducts} {t('categories.models')}
          </h3>
          <Filter />
          <div className={styles.product}>
            <CardSkeleton amount={10} />
          </div>
        </div>
      )}

      {products.length > 0 && !isLoading && (
        <div className={styles.catalog}>
          <h3 className={styles.catalog__quantity}>
            {totalProducts} {t('categories.models')}
          </h3>
          <Filter />
          <div className={styles.product}>
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {!products.length && isSearchPerformed && (
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className={styles.animation}>
            <LottieAnimation animationData={animationData} />
          </div>
          <p className={styles.message}>
            {t('search.There are no products matching the query!')}
          </p>
          <Link to={pathname} className={styles['try-again-button']}>
            {t('search.Try again')}
          </Link>
        </section>
      )}
    </section>
  );
};
