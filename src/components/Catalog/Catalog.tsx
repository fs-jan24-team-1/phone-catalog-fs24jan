import styles from './catalog.module.scss';
import { ProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import { Dropdown } from '../UI/DropDown';
import { useState } from 'react';

interface Props {
  products: Product[];
}

const sortOptions = [
  { value: 'priceLow', label: 'Price Low' },
  { value: 'priceHigh', label: 'Price High' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
];

const itemsPerPageOptions = [
  { value: 8, label: '8' },
  { value: 16, label: '16' },
  { value: 24, label: '24' },
];

export const Catalog: React.FC<Props> = ({ products }) => {
  const [sortBy, setSortBy] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  const handleSortChange = (selectedSort: string) => {
    setSortBy(selectedSort);
  };

  const handleItemsPerPageChange = (selectedItemsPerPage: string) => {
    setItemsPerPage(parseInt(selectedItemsPerPage, 10));
  };
  const sortedProducts = [...products];

  if (sortBy === 'priceLow') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'priceHigh') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    sortedProducts.sort((a, b) => b.year - a.year);
  } else if (sortBy === 'oldest') {
    sortedProducts.sort((a, b) => a.year - b.year);
  }

  const paginatedProducts = sortedProducts.slice(0, itemsPerPage);
  const numberOfItems = products.length;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h3>{numberOfItems} models</h3>

        <div className={styles.filter}>
          <div className={styles.filterContainer}>
            <span className={styles.filterDescription}>Sort by</span>
            <Dropdown options={sortOptions} onSelectChange={handleSortChange} />
          </div>

          <div className={styles.filterContainer}>
            <span className={styles.filterDescription}>Items on page</span>
            <Dropdown
              options={itemsPerPageOptions}
              onSelectChange={handleItemsPerPageChange}
            />
          </div>
        </div>

        <div className={styles.sectionWrapper}>
          {paginatedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
