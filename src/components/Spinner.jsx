import React from "react";
import './spinner.css';

const Spinner = ({ loading }) => {
  return (
    <div className="container">
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
};

export default Spinner;
