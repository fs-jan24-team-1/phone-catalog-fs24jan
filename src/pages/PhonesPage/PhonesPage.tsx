import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Catalog } from "../../components/Catalog";
import { Pagination } from "../../components/Pagination";
import { usePageLogic } from "../../hooks/usePageLogic";
import { Category } from "../../types/Category";
import styles from "./phonesPage.module.scss";
import { useScrollToTopEffect } from "../../utils/useScrollToTopEffect";

export const PhonesPage = () => {
  const { currentProducts, sortedProducts, currentPage, handlePagination } = usePageLogic(Category.phones);

  useScrollToTopEffect();

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <h1 className="title">Mobile phones</h1>
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
