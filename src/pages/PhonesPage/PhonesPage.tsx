import { usePageLogic } from 'hooks/usePageLogic';
import { Category } from 'types';
import { useScrollToTopEffect } from 'utils';
import { useTranslation } from 'react-i18next';
import styles from './phonesPage.module.scss';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Catalog } from 'components/Catalog';
import { Pagination } from 'components/Pagination';

export const PhonesPage = () => {
  const { currentProducts, totalCount = 0, currentPage, handlePagination } =
    usePageLogic(Category.phones);
  const [t] = useTranslation('global');

  useScrollToTopEffect();

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className={styles.container__title}>
        {t('categories.Mobile phones')}
      </h1>

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
  );
};
