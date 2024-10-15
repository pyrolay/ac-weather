import React from "react";
import "./Search.css";
import { Error } from "../Error/Error";

const Search = ({ setCityName, citySearchData, setCityData, setModal, errorCity }) => {
  const handleCity = (e) => setCityName(e.target.value);

  const selectCity = (city) => {
    setCityData({ name: city.name, lat: city.lat, lon: city.lon });
    setModal({ visible: false, isSearch: false });
  };

  return (
    <div className="searchContainer">
      <SearchBar onChange={handleCity} />
      {errorCity && <Error error={errorCity}/>}
      {!errorCity && citySearchData?.length ? (
        <ResultsList citySearchData={citySearchData} onSelect={selectCity} />
      ) : null}
    </div>
  );
};

const SearchBar = ({ onChange }) => (
  <div className="searchBarContainer">
    <input
      type="text"
      className="searchBar"
      placeholder="ex: Buenos Aires, Argentina"
      onChange={onChange}
    />
    <p>*For searching by state or country, divide by comma.</p>
  </div>
);

const ResultsList = ({ citySearchData, onSelect }) => (
  <div className="resultsContainer">
    {citySearchData.map((city, index) => (
      <ResultItem key={index} city={city} onSelect={onSelect} />
    ))}
  </div>
);

const ResultItem = ({ city, onSelect }) => (
  <div className="resultCityItem" onClick={() => onSelect(city)}>
    <p className="resultCityName">
      {city.name}, {city.state ? `${city.state}, ` : ""}{city.country}
    </p>
    <p className="resultCityCoordinates">
      {city.lat}, {city.lon}
    </p>
  </div>
);

export { Search };