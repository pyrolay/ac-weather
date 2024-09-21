import React from "react";
import "./Search.css";

const Search = () => {
  return (
    <div className="searchContainer">
      <div className="searchBarContainer">
        <input
          type="text"
          className="searchBar"
          placeholder="ex: Buenos Aires, Argentina"
        />
        <p>*For searching by state or country, divide by comma.</p>
      </div>
      <div className="resultsContainer">
        <div className="resultCityItem">
          <p className="resultCityName">Buenos Aires, AR</p>
          <p className="resultCityCoordenates">Lat, Lon</p>
        </div>
      </div>
    </div>
  );
};

export { Search };
