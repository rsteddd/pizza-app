import React, {FC} from 'react';
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss"

type PaginationProps = {
    currentPage: number;
    onChangePage: (event: number) => void
}


const Pagination: FC<PaginationProps> = ({currentPage, onChangePage}) => {

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=" >"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="< "
            forcePage={currentPage - 1}
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
