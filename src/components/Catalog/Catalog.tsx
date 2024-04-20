import styles from './catalog.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import { Dropdown } from '../UI/DropDown';

interface Props {
  products: Product[];
}

export const Catalog: React.FC<Props> = ({ products }) => {
  const numberOfItems = products.length;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3>{numberOfItems} models</h3>

        <div className={styles.filter}>
          <div className={styles.filterContainer}>
            <span className={styles.filterDescription}>Sort by</span>
            <Dropdown />
          </div>

          <div className={styles.filterContainer}>
            <span className={styles.filterDescription}>Items on page</span>
            <Dropdown />
          </div>
        </div>

        <div className={styles.sectionWrapper}>
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
