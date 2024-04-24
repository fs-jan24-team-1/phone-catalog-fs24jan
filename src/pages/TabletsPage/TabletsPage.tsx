import { Catalog } from '../../components/Catalog';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Pagination } from '../../components/Pagination';
import { Category } from '../../types/Category';
import { usePageLogic } from '../../hooks/usePageLogic';
import styles from './tabletsPage.module.scss';
import { useScrollToTopEffect } from '../../utils/useScrollToTopEffect';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';

export const TabletsPage = () => {
  const { currentProducts, sortedProducts, currentPage, handlePagination } =
    usePageLogic(Category.tablets);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, [currentProducts]);

  useScrollToTopEffect();

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className={styles.container__title}>Tablets</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Catalog
            products={currentProducts}
            totalProducts={sortedProducts.length}
          />
          <Pagination
            length={sortedProducts.length}
            currentPage={currentPage}
            handlePagination={handlePagination}
          />
        </>
      )}
    </div>
  );
};
