import styles from './catalog.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import { Filter } from '../Filter/Filter';
import { LottieAnimation } from '../UI/LottieAnimation';
import * as animationData from '../../animations/ProductsNotFound.json';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';

interface Props {
  products: Product[];
  totalProducts: number;
}

export const Catalog: React.FC<Props> = ({ products, totalProducts }) => {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, [products, pathname]);

  return (
    <section className={styles.section}>
      {isLoading && <Loader />}
      {!isLoading && products.length > 0 ? (
        <div className={styles.container}>
          <h3>{totalProducts} models</h3>
          <Filter />
          <div className={styles.sectionWrapper}>
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : !isLoading ? (
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={styles.animation}>
            <LottieAnimation animationData={animationData} />
          </div>

          <p className={styles.message}>
            There are no products matching the query!
          </p>

          <Link to={pathname} className={styles['try-again-button']}>
            Try again
          </Link>
        </section>
      ) : null}
    </section>
  );
};
