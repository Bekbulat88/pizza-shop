import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';

type PaginationProps = {
  onChangeCurrentPage : any
}
const Pagination = ({ onChangeCurrentPage } : PaginationProps) => {
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
        // renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;