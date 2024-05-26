import { useEffect, useState } from 'react';
import { Product, Category } from 'types';
import { SortBy } from 'components/Filter';
import { useSearchParams } from 'react-router-dom';
import { getProductsByCategory } from 'api';

export const usePageLogic = (category: Category) => {
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.age);
  const [searchParams, setSearchParams] = useSearchParams();
  const [, setSearchQuery] = useState('');

  const params = new URLSearchParams(searchParams);
  const perPage = params.get('perPage');
  const productsPerPage = perPage ? Number(perPage) : totalCount;

  useEffect(() => {
    const fetchProducts = async () => {
      const { products, totalCount } = await getProductsByCategory(
        category,
        sortBy,
        String(productsPerPage),
        currentPage,
      );
      setCurrentProducts(products);
      setTotalCount(totalCount);
    };

    fetchProducts();
  }, [category, sortBy, productsPerPage, currentPage]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
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

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    params.set('page', pageNumber.toString());
    setSearchParams(params.toString());
  };

  return { currentProducts, totalCount, currentPage, handlePagination };
};
