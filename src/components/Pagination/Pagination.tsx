type Props = {
  productsPerPage: number;
  length: number;
  handlePagination: (pageNumber: number) => void;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  productsPerPage,
  length,
  currentPage,
  handlePagination,
}) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / productsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className="pagination">
      {paginationNumbers.map(pageNumber => (
        <button
          key={pageNumber}
          onClick={() => handlePagination(pageNumber)}
          className={currentPage === pageNumber ? 'active' : ''}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};
