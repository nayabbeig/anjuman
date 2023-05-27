import Pagination from "react-bootstrap/Pagination";

function TablePagination({ totalPages, currentPage }) {
  return currentPage > 8 ? (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{currentPage - 2}</Pagination.Item>
      <Pagination.Item>{currentPage - 1}</Pagination.Item>
      <Pagination.Item active>{currentPage}</Pagination.Item>
      <Pagination.Item>{currentPage + 1}</Pagination.Item>
      <Pagination.Item disabled>{currentPage + 1}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{totalPages}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  ) : (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item active={currentPage === 1}>{1}</Pagination.Item>
      {currentPage >= 2 && (
        <Pagination.Item active={currentPage === 2}>{2}</Pagination.Item>
      )}
      {currentPage >= 3 && (
        <Pagination.Item active={currentPage === 3}>{3}</Pagination.Item>
      )}
      {currentPage >= 4 && (
        <Pagination.Item active={currentPage === 4}>{4}</Pagination.Item>
      )}
      {currentPage >= 5 && (
        <Pagination.Item active={currentPage === 5}>{5}</Pagination.Item>
      )}
      {currentPage >= 6 && (
        <Pagination.Item active={currentPage === 6}>{6}</Pagination.Item>
      )}
      {currentPage >= 7 && (
        <Pagination.Item active={currentPage === 7}>{7}</Pagination.Item>
      )}
      {currentPage >= 8 && (
        <Pagination.Item active={currentPage === 8}>{8}</Pagination.Item>
      )}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}

export default TablePagination;
