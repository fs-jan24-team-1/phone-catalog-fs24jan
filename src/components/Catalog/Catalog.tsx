import styles from './catalog.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import { Dropdown } from '../UI/DropDown';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface Props {
  products: Product[];
  totalProducts: number;
}

export enum SortBy {
  age = 'age',
  title = 'title',
  price = 'price',
}

const sortOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const itemsPerPageOptions = [
  { value: Infinity, label: 'All' },
  { value: 4, label: '4' },
  { value: 8, label: '8' },
  { value: 16, label: '16' },
];

export const Catalog: React.FC<Props> = ({ products, totalProducts }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const sortByParam = params.get('sort');
  const [sortBy, setSortBy] = useState<SortBy>(
    sortByParam ? (sortByParam as SortBy) : SortBy.age,
  );
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);

  useEffect(() => {
    const sortProducts = () => {
      const sortedProductsCopy = [...products];
      if (sortBy === SortBy.price) {
        sortedProductsCopy.sort((a, b) => a.price - b.price);
      } else if (sortBy === SortBy.title) {
        sortedProductsCopy.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === SortBy.age) {
        sortedProductsCopy.sort((a, b) => b.year - a.year);
      }
      setSortedProducts(sortedProductsCopy);
    };

    sortProducts();
  }, [sortBy, products, searchParams]);

  const handleSortParams = (selectedSort: SortBy) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', selectedSort);
    setSearchParams(params.toString());
    setSortBy(selectedSort);
  };

  const dispatch = useDispatch();
  const handlePerPageParams = (selectedItemsPerPage: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.has('perPage')) {
      params.set('perPage', selectedItemsPerPage);
    } else {
      params.append('perPage', selectedItemsPerPage);
    }
    setSearchParams(params.toString());
    dispatch({
      type: 'product/setProductsPerPage',
      payload: selectedItemsPerPage,
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.catalog}>
        <h3 className={styles.catalog__quantity}>{totalProducts} models</h3>

        <div className={`${styles.catalog__filter} ${styles.filter}`}>
          <div className={styles.filter__сontainer}>
            <span className={styles.filter__description}>Sort by</span>
            <Dropdown options={sortOptions} onSelectChange={handleSortParams} />
          </div>

          <div className={styles.filter__сontainer}>
            <span className={styles.filter__description}>Items on page</span>
            <Dropdown
              options={itemsPerPageOptions}
              onSelectChange={handlePerPageParams}
            />
          </div>
        </div>

        <div className={styles.product}>
          {sortedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
