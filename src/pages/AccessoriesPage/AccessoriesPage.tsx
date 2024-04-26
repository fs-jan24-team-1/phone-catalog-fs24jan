import { Catalog } from '../../components/Catalog';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Pagination } from '../../components/Pagination';
import { Category } from '../../types';
import { usePageLogic } from '../../hooks/usePageLogic';
import { useScrollToTopEffect } from '../../utils';
import { useTranslation } from 'react-i18next';
import styles from './accesoriesPage.module.scss';

export const AccessoriesPage = () => {
  const { currentProducts, sortedProducts, currentPage, handlePagination } =
    usePageLogic(Category.accessories);
  const [t] = useTranslation('global');

  useScrollToTopEffect();

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className={styles.container__title}>{t('categories.Accessories')}</h1>

      <Catalog
        products={currentProducts}
        totalProducts={sortedProducts.length}
      />
      <Pagination
        length={sortedProducts.length}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};
