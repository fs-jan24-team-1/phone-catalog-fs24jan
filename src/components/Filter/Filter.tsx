import { useSearchParams } from 'react-router-dom';
import { Dropdown } from '../UI/DropDown';
import styles from './filter.module.scss';
import { useState } from 'react';

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

export const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const sortByParam = params.get('sort');
  const [sortBy, setSortBy] = useState<SortBy>(
    sortByParam ? (sortByParam as SortBy) : SortBy.age,
  );
  console.log(sortBy);

  const handleSortParams = (selectedSort: SortBy) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', selectedSort);
    setSearchParams(params.toString());
    setSortBy(selectedSort);
  };

  const handlePerPageParams = (selectedItemsPerPage: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('perPage', selectedItemsPerPage);
    setSearchParams(params.toString());
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filterContainer}>
        <span className={styles.filterDescription}>Sort by</span>
        <Dropdown
          options={sortOptions}
          onSelectChange={handleSortParams} />
      </div>

      <div className={styles.filterContainer}>
        <span className={styles.filterDescription}>Items on page</span>
        <Dropdown
          options={itemsPerPageOptions}
          onSelectChange={handlePerPageParams}
        />
      </div>
    </div>
  );
};
