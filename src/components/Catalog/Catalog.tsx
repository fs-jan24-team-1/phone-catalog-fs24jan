import styles from './catalog.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import { Filter } from '../Filter/Filter';

interface Props {
  products: Product[];
  totalProducts: number;
}

export const Catalog: React.FC<Props> = ({ products, totalProducts }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3>{totalProducts} models</h3>
        <Filter />
        <div className={styles.sectionWrapper}>
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
