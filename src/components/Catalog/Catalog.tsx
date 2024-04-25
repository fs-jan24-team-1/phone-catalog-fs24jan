import styles from './catalog.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import { Filter } from '../Filter/Filter';
import { useEffect, useState } from 'react';
import { CardSkeleton } from '../ProductCardSkeleton';
import { LottieAnimation } from '../UI/LottieAnimation';
import * as animationData from '../../animations/ProductsNotFound.json';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


interface Props {
  products: Product[];
  totalProducts: number;
}

export const Catalog: React.FC<Props> = ({ products, totalProducts }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { pathname } = useLocation();
  const [t] = useTranslation('global');

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.section}>
      {products.length > 0 ? (
        <div className={styles.catalog}>
          <h3 className={styles.catalog__quantity}>{totalProducts} {t('categories.models')}</h3>

          <Filter />

                <div className={styles.product}>
                {isLoading ? (
          <CardSkeleton amount={12} />
        ) : (
          products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
          </div>
        </div>
      ) : (
        <section style={{ display: 'flex', flexDirection: 'column' }}>
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
