import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import { Category } from '../../types/Category';
import { Product } from '../../types/Product';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Catalog } from '../../components/Catalog';
import { Pagination } from '../../components/Pagination';
import { sortProducts } from '../../utils/sortProducts';

import styles from './phonesPage.module.scss';
import { SortBy } from '../../components/Filter';

export const PhonesPage = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const productsPerPage = useSelector((state: RootState) => state.product.productsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.age);

  const filteredProducts = products.filter(
    (product: Product) => product.category === Category.phones
  );

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const sortByParam = params.get('sort');
    if (sortByParam && Object.values(SortBy).includes(sortByParam as SortBy)) {
      setSortBy(sortByParam as SortBy);
    } else {
      setSortBy(SortBy.age);
    }
  }, [searchParams]);

  const sortedProducts = sortProducts(filteredProducts, sortBy);

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <h1 className="title">Mobile phones</h1>
      <Catalog products={currentProducts} totalProducts={sortedProducts.length} />
      <Pagination
        length={sortedProducts.length}
        currentPage={currentPage}
        handlePagination={handlePagination}
      />
    </div>
  );
};
