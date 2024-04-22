import { Catalog } from '../../components/Catalog';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Pagination } from '../../components/Pagination';
import { Category } from '../../types/Category';
import { usePageLogic } from '../../hooks/usePageLogic';
import styles from './accesoriesPage.module.scss';

export const AccessoriesPage = () => {
  let products = useSelector((state: RootState) => state.product.products);
  const productsPerPage = useSelector(
    (state: RootState) => state.product.productsPerPage,
  );
  const [currentPage, setCurrentPage] = useState(1);

  products = products.filter(
    (product: Product) => product.category === Category.accessories,
  );

  const handlePagination = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);
  const { currentProducts, sortedProducts, currentPage, handlePagination } = usePageLogic(Category.accessories);

  return (
    <div className={styles.container}>
      <Breadcrumbs />

      <h1 className={styles.container__title}>Accesories</h1>

      <Catalog products={currentProducts} totalProducts={sortedProducts.length} />
      <Pagination
        length={sortedProducts.length}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};
