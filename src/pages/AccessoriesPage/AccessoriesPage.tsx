import styles from './accesoriesPage.module.scss';
import { Catalog } from '../../components/Catalog';
import { useSelector } from 'react-redux';
import { Product } from '../../types/Product';
import { RootState } from '../../store/store';

export const AccessoriesPage = () => {
  let products = useSelector((state: RootState) => state.product.products);

  products = products.filter(
    (product: Product) => product.category === 'accessories',
  );

  return (
    <div className={styles.container}>
      <h1 className="title">Accesories</h1>
      
      <Catalog products={products} />
    </div>
  );
};
