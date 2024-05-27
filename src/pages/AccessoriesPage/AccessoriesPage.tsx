import { Category } from 'types';
import { usePageLogic } from 'hooks/usePageLogic';
import { useScrollToTopEffect } from 'utils';
import { useTranslation } from 'react-i18next';
import styles from './accesoriesPage.module.scss';
import { Catalog } from 'components/Catalog';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Pagination } from 'components/Pagination';
import { isValidCurrentPage } from 'utils/isValidCurrentPage';
import { NotFoundPage } from 'pages/NotFoundPage';

export const AccessoriesPage = () => {
  const { currentProducts, totalCount = 0, currentPage, handlePagination } =
    usePageLogic(Category.accessories);
  const [t] = useTranslation('global');

  useScrollToTopEffect();

  return (
    <>
    {isValidCurrentPage(totalCount, currentPage) ? (
      <div className={styles.container}>
        <Breadcrumbs />

        <h1 className={styles.container__title}>{t('categories.Accessories')}</h1>

        <Catalog
          products={currentProducts}
          totalProducts={totalCount}
        />
        <Pagination
          length={totalCount}
          currentPage={currentPage}
          handlePagination={handlePagination}
        />
      </div>
    ) : (
      <NotFoundPage />
    )}
  </>
  );
};
