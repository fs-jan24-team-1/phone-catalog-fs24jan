import { usePageLogic } from 'hooks/usePageLogic';
import { Category } from 'types';
import { useScrollToTopEffect } from 'utils';
import { useTranslation } from 'react-i18next';
import styles from './phonesPage.module.scss';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Catalog } from 'components/Catalog';
import { Pagination } from 'components/Pagination';
import { motion, Variants } from 'framer-motion';
import { NotFoundPage } from 'pages/NotFoundPage';
import { isValidCurrentPage } from 'utils/isValidCurrentPage';

export const PhonesPage = () => {
  const {
    currentProducts,
    totalCount = 0,
    currentPage,
    handlePagination,
  } = usePageLogic(Category.phones);
  const [t] = useTranslation('global');

  useScrollToTopEffect();

  const titleVariants: Variants = {
    initial: {
      y: -50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        stiffness: 70,
        damping: 10,
      },
    },
  };

  return (
    <>
      {isValidCurrentPage(totalCount, currentPage) ? (
        <div className={styles.container}>
          <Breadcrumbs />

          <motion.h1
            className={styles.container__title}
            variants={titleVariants}
            initial="initial"
            animate="visible"
          >
            {t('categories.Mobile phones')}
          </motion.h1>

          <Catalog products={currentProducts} totalProducts={totalCount} />
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
