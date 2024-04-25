import styles from './catalog.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import { Filter } from '../Filter/Filter';
import { useEffect, useState } from 'react';
import { CardSkeleton } from '../ProductCardSkeleton';

interface Props {
  products: Product[];
  totalProducts: number;
}

export const Catalog: React.FC<Props> = ({ products, totalProducts }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3>{totalProducts} models</h3>
          <Filter />
        <div className={styles.sectionWrapper}>
        {isLoading ? (
          <CardSkeleton amount={12} />
        ) : (
          products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
        </div>
      </div>
    </section>
  );
};
