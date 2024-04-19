import styles from './phonesPage.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Catalog } from '../../components/Catalog';

export const PhonesPage = () => {
  let products = useSelector((state: RootState) => state.product.products);

  products = products.filter(
    (product: Product) => product.category === 'phones',
  );

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className="title">Mobile phones</h1>

      <Catalog products={products} />
    </div>
  );
};
