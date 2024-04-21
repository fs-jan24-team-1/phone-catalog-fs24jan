import React from 'react';
import { ButtonSlider } from '../UI/ButtonSlider';
import { ButtonPagination } from '../UI/ButtonPagination';
import styles from './pagination.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type Props = {
  length: number;
  currentPage: number;
  handlePagination: (pageNumber: number) => void;
};

export const Pagination: React.FC<Props> = ({
  length,
  currentPage,
  handlePagination,
}) => {
  const paginationNumbers = [];
  const productsPerPage = useSelector((state: RootState) => state.product.productsPerPage);

  for (let i = 1; i <= Math.ceil(length / productsPerPage); i++) {
    paginationNumbers.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < paginationNumbers.length) {
      handlePagination(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pagination}>
        <ButtonSlider
          iconType="arrowLeft"
          active={currentPage === 1}
          handleClick={handlePreviousPage}
        />
        {paginationNumbers.map(pageNumber => (
          <div
            key={pageNumber}
            onClick={() => handlePagination(pageNumber)}
            className={`pagination-item ${currentPage === pageNumber ? 'active' : ''}`}
          >
            <ButtonPagination
              text={pageNumber}
              active={currentPage === pageNumber}
              onClick={() => handlePagination(pageNumber)}
            />
          </div>
        ))}
        <ButtonSlider
          iconType="arrowRight"
          active={currentPage === paginationNumbers.length}
          handleClick={handleNextPage}
        />
      </div>
    </div>
  );
};