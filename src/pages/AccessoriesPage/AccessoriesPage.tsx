import { Catalog } from '../../components/Catalog';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Pagination } from '../../components/Pagination';
import { Category } from '../../types/Category';
import { usePageLogic } from '../../hooks/usePageLogic';
import styles from './accesoriesPage.module.scss';
import { useScrollToTopEffect } from '../../utils/useScrollToTopEffect';
import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { useTranslation } from 'react-i18next';

export const AccessoriesPage = () => {
  const { currentProducts, sortedProducts, currentPage, handlePagination } =
    usePageLogic(Category.accessories);
  const [isLoading, setIsLoading] = useState(true);
  const [t] = useTranslation('global');

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, [currentProducts]);

  useScrollToTopEffect();

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className={styles.container__title}>{t('categories.Accessories')}</h1>

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
