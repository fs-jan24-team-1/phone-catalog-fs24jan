import { useEffect, useState } from 'react';
import { Product, Category } from 'types';
import { sortProducts } from 'utils';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { SortBy } from 'components/Filter';
import { useSearchParams } from 'react-router-dom';

export const usePageLogic = (category: Category) => {
  const products = useSelector((state: RootState) => state.product.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.age);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const params = new URLSearchParams(searchParams);
  const perPage = params.get('perPage');
  const productsPerPage = perPage ? Number(perPage) : products.length;

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
    const query = searchParams.get('query') || '';
    setSearchQuery(query);
  }, [searchParams]);

  const filteredProducts = products.filter(
    (product: Product) => product.category === category,
  );
  let sortedProducts = sortProducts(filteredProducts, sortBy);

  if (searchQuery) {
    sortedProducts = sortedProducts.filter((product: Product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    );
  }

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
