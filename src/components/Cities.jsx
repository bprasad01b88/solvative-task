import React from "react";
import Pagination from "./Pagination";
import "./cities.css";

const Cities = ({
  currentItems,
  cities,
  loading,
  indexOfFirstItem,
  searchTerm,
  pageNumbers,
  paginate,
  currentPage,
}) => {
  return (
    <div className="table-content">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((city, index) => {
            return (
              <tr key={city.id}>
                <td>{indexOfFirstItem + index}</td>
                <td>{city.name}</td>
                <td>{city.country}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!loading && cities.length === 0 && searchTerm && (
        <p className="no-data">No result found</p>
      )}
      {pageNumbers > 1 && (
        <Pagination
          pageNumbers={pageNumbers}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default Cities;
