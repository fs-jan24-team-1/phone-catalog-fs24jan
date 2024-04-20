import styles from './tabletsPage.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Product } from '../../types/Product';
import { Catalog } from '../../components/Catalog';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const TabletsPage = () => {
  let products = useSelector((state: RootState) => state.product.products);

  products = products.filter(
    (product: Product) => product.category === 'tablets',
  );

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <h1 className="title">Tablets Page</h1>

      <Catalog products={products} totalProducts={products.length}/>
    </div>
  );
};
