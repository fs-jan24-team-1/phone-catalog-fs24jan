import { Link } from 'react-router-dom';
import styles from './buttonPagination.module.scss';
import { useState } from 'react';

export const ButtonPagination = () => {
  const [selectedPagination, setSelectedPagination] = useState(false);

  const handleClickPagination = () => {
    setSelectedPagination(!selectedPagination);
  };

  const paginationExample = [1,2,3,4,5];

  return (
    <div className={styles.pagination__сontainer}>
      {paginationExample.map(curVal =>
        <Link
          key={curVal}
          to="#"
          className={`${styles.button} ${selectedPagination ? styles.selected : styles.default}`}
          onClick={handleClickPagination}
        >
          {curVal}
        </Link>
      )}
    </div>
  );
};
