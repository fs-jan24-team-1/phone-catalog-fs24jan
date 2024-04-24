import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Catalog } from '../../components/Catalog';
import { Pagination } from '../../components/Pagination';
import { usePageLogic } from '../../hooks/usePageLogic';
import { Category } from '../../types/Category';
import styles from './phonesPage.module.scss';
import { useScrollToTopEffect } from '../../utils/useScrollToTopEffect';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';

export const PhonesPage = () => {
  const { currentProducts, sortedProducts, currentPage, handlePagination } =
    usePageLogic(Category.phones);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, [currentProducts]);

  useScrollToTopEffect();

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className={styles.container__title}>Mobile phones</h1>

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
