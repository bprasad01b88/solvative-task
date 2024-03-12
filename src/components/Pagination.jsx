import React from "react";
import "./pagination.css";

const Pagination = ({ pageNumbers, paginate, currentPage }) => {
  return (
    <>
      <nav>
        <ul className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="prev-btn"
          >
            Previous
          </button>

          {Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
            (number) => (
              <li
                key={number}
                className={number === currentPage ? "active" : ""}
              >
                <a onClick={() => paginate(number)} href="!#">
                  {number}
                </a>
              </li>
            )
          )}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers}
            className="next-btn"
          >
            Next
          </button>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
