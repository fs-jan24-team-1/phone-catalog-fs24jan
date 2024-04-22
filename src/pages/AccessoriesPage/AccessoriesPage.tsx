import styles from './accesoriesPage.module.scss';
import { Catalog } from '../../components/Catalog';
import { useSelector } from 'react-redux';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { RootState } from '../../store/store';
import { SetStateAction, useState } from 'react';
import { Pagination } from '../../components/Pagination';
import { Category } from '../../types/Category';

export const AccessoriesPage = () => {
  let products = useSelector((state: RootState) => state.product.products);
  const productsPerPage = useSelector(
    (state: RootState) => state.product.productsPerPage,
  );
  const [currentPage, setCurrentPage] = useState(1);

  products = products.filter(
    (product: Product) => product.category === Category.accessories,
  );

  const handlePagination = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className={styles.container__title}>Accesories</h1>

      <Catalog products={currentProducts} totalProducts={products.length} />
      <Pagination
        length={products.length}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};
