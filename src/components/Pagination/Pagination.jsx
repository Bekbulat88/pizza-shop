import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';
const Pagination = ({ onChangeCurrentPage }) => {
  return (
    <>
      <ReactPaginate
        className={style.paginationBlock}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangeCurrentPage(event.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
