import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";
import Cities from "./Cities";
import Spinner from "./Spinner";

const Home = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // function for fetching cities data using axios
  const fetchCities = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_URl,
        {
          headers: {
            "x-rapidapi-host": process.env.REACT_APP_API_HOST_KEY,
            "x-rapidapi-key":
              process.env.REACT_APP_API_KEY,
          },
          params: {
            countryIds: "IN",
            namePrefix: debouncedSearchTerm,
          },
        }
      );
      setCities(res.data.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCities("");
    if (debouncedSearchTerm) {
      fetchCities();
      setCurrentPage(1);
    } else {
      setCities([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault();
        document.getElementById('searchBox').focus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);


  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cities.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = Math.ceil(cities.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="header">
        <div className="head-text-group">
          <input
            type="text"
            className="search-input"
            placeholder="Search places..."
            id="searchBox"
            name="searchCity"
            value={searchTerm}
            onChange={handleChange}
          />
          <div className="ctrl-btn">Ctrl+/</div>
        </div>
      </div>
      <Spinner loading={loading} />
      <Cities
        currentItems={currentItems}
        cities={cities}
        loading={loading}
        indexOfFirstItem={indexOfFirstItem}
        searchTerm={searchTerm}
        pageNumbers={pageNumbers}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
};

export default Home;
