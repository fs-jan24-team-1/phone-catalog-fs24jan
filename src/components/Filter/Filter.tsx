import { useSearchParams } from 'react-router-dom';
import { Dropdown } from 'components/UI/DropDown';
import { useTranslation } from 'react-i18next';
import styles from './filter.module.scss';
import { useTheme } from 'hooks/useTheme';



export enum SortBy {
  age = 'year',
  title = 'name',
  price = 'price',
}

export const Filter = () => {
  const [t] = useTranslation('global');
  const [searchParams, setSearchParams] = useSearchParams();

  const sortOptions = [
    { value: 'year', label: t('filters.Newest') },
    { value: 'name', label: t('filters.Alphabetically') },
    { value: 'price', label: t('filters.Cheapest') },
  ];

  const itemsPerPageOptions = [
    { value: 200, label: t('filters.All') },
    { value: 4, label: '4' },
    { value: 8, label: '8' },
    { value: 16, label: '16' },
  ];

  const handleSortParams = (selectedSort: SortBy) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', selectedSort);
    setSearchParams(params.toString());
  };

  const handlePerPageParams = (selectedItemsPerPage: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('perPage', selectedItemsPerPage);
    setSearchParams(params.toString());
  };

  const { theme } = useTheme();
  let isDarkTheme;
  theme === 'dark' ? (isDarkTheme = true) : (isDarkTheme = false);

  return (
    <div className={styles.filter}>
      <div className={styles.filter__сontainer}>
        <span className={styles.filter__description}>
          {t('filters.Sort by')}
        </span>

        <Dropdown
          options={sortOptions}
          onSelectChange={handleSortParams}
          isSortDropdown={true}
          theme={isDarkTheme}
        />
      </div>

      <div className={styles.filter__сontainer}>
        <span className={styles.filter__description}>
          {t('filters.Items on page')}
        </span>

        <Dropdown
          options={itemsPerPageOptions}
          onSelectChange={handlePerPageParams}
          theme={isDarkTheme}
        />
      </div>
    </div>
  );
};
