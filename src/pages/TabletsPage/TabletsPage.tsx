import { Category } from 'types';
import { usePageLogic } from 'hooks/usePageLogic';
import { useScrollToTopEffect } from 'utils';
import { useTranslation } from 'react-i18next';
import styles from './tabletsPage.module.scss';
import { Catalog } from 'components/Catalog';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Pagination } from 'components/Pagination';
import { motion } from 'framer-motion';
import { titleVariants } from 'utils/titleVariants';

export const TabletsPage = () => {
  const { currentProducts, totalCount = 0, currentPage, handlePagination } =
    usePageLogic(Category.tablets);
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
        {t('categories.Tablets')}
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
