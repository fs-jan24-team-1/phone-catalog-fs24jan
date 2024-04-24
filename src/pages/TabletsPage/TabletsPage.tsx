import { Catalog } from '../../components/Catalog';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Pagination } from '../../components/Pagination';
import { Category } from '../../types/Category';
import { usePageLogic } from '../../hooks/usePageLogic';
import styles from './tabletsPage.module.scss';
import { useScrollToTopEffect } from '../../utils/useScrollToTopEffect';

export const TabletsPage = () => {
  const { currentProducts, sortedProducts, currentPage, handlePagination } = usePageLogic(Category.tablets);

  useScrollToTopEffect();

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <h1 className="title">Tablets Page</h1>

      <Catalog products={currentProducts} totalProducts={sortedProducts.length} />
      <Pagination
        length={sortedProducts.length}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};
