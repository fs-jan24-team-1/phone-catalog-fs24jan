import { Category } from 'types';
import { usePageLogic } from 'hooks/usePageLogic';
import { useScrollToTopEffect } from 'utils';
import { useTranslation } from 'react-i18next';
import styles from './tabletsPage.module.scss';
import { Catalog } from 'components/Catalog';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Pagination } from 'components/Pagination';

export const TabletsPage = () => {
  const { currentProducts, sortedProducts, currentPage, handlePagination } =
    usePageLogic(Category.tablets);
  const [t] = useTranslation('global');

  useScrollToTopEffect();

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className={styles.container__title}>{t('categories.Tablets')}</h1>

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
