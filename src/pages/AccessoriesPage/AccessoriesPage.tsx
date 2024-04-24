import { Catalog } from '../../components/Catalog';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Pagination } from '../../components/Pagination';
import { Category } from '../../types/Category';
import { usePageLogic } from '../../hooks/usePageLogic';
import styles from './accesoriesPage.module.scss';
import { useScrollToTopEffect } from '../../utils/useScrollToTopEffect';

export const AccessoriesPage = () => {
  const { currentProducts, sortedProducts, currentPage, handlePagination } = usePageLogic(Category.accessories);

  useScrollToTopEffect();

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className="title">AccesoriesCategory page</h1>

      <Catalog products={currentProducts} totalProducts={sortedProducts.length} />

      <Pagination
        length={sortedProducts.length}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};
