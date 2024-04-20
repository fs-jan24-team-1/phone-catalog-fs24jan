import styles from './phonesPage.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Catalog } from '../../components/Catalog';
import { SetStateAction, useState } from 'react';
import { Pagination } from '../../components/Pagination';

export const PhonesPage = () => {
  let products = useSelector((state: RootState) => state.product.products);
  const productsPerPage = useSelector((state: RootState) => state.product.productsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  products = products.filter(
    (product: Product) => product.category === 'phones',
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

      <h1 className="title">Mobile phones</h1>

      <Catalog products={currentProducts} totalProducts={products.length}/>
      <Pagination
        length={products.length}
        productsPerPage={productsPerPage}
        handlePagination={handlePagination}
        currentPage={currentPage}
      />
    </div>
  );
};
