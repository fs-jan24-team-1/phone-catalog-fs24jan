import { FC, useEffect, useState } from 'react';
import styles from './catalog.module.scss';
import { Product } from 'types';
import { useTranslation } from 'react-i18next';
import { Filter } from 'components/Filter';
import { ProductCard } from 'components/ProductCard';
import { CardSkeleton } from 'components/ProductCardSkeleton';

interface Props {
  products: Product[];
  totalProducts: number;
}

export const Catalog: FC<Props> = ({ products, totalProducts }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [t] = useTranslation('global');

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
    </section>
  );
};
