import { Category } from 'types';
import { usePageLogic } from 'hooks/usePageLogic';
import { useScrollToTopEffect } from 'utils';
import { useTranslation } from 'react-i18next';
import styles from './accesoriesPage.module.scss';
import { Catalog } from 'components/Catalog';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Pagination } from 'components/Pagination';
import { motion } from 'framer-motion';
import { titleVariants } from 'utils/titleVariants';

export const AccessoriesPage = () => {
  const { currentProducts, totalCount = 0, currentPage, handlePagination } =
    usePageLogic(Category.accessories);
  const [t] = useTranslation('global');

  useScrollToTopEffect();

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <motion.h1
        className={styles.container__title}
        variants={titleVariants}
        initial="initial"
        animate="visible"
      >
        {t('categories.Accessories')}
      </motion.h1>

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
