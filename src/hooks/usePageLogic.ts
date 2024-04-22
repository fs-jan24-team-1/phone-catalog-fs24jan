import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Category } from "../types/Category";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SortBy } from "../components/Filter";
import { Product } from "../types/Product";
import { sortProducts } from "../utils/sortProducts";

export const usePageLogic = (category: Category) => {
  const products = useSelector((state: RootState) => state.product.products);
  const productsPerPage = useSelector(
    (state: RootState) => state.product.productsPerPage,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.age);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    const sortByParam = params.get('sort');
    setSortBy(
      sortByParam && Object.values(SortBy).includes(sortByParam as SortBy)
        ? (sortByParam as SortBy)
        : SortBy.age,
    );
    if (!params.get('page')) {
      params.set('page', '1');
      setCurrentPage(1);
    } else {
      setCurrentPage(parseInt(params.get('page') as string));
    }
  }, [searchParams]);

  const filteredProducts = products.filter(
    (product: Product) => product.category === category,
  );
  const sortedProducts = sortProducts(filteredProducts, sortBy);

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    params.set('page', pageNumber.toString());
    setSearchParams(params.toString());
  };

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstPost,
    indexOfLastPost,
  );

  return { currentProducts, sortedProducts, currentPage, handlePagination };
};
