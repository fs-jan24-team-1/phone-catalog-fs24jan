import styles from './catalog.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';

interface Props {
  products: Product[];
  totalProducts: number;
}

export const Catalog: React.FC<Props> = ({ products, totalProducts }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3>{totalProducts} models</h3>

        <div className="filter">filter component</div>

        <div className={styles.sectionWrapper}>
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
