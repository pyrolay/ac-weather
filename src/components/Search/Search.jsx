import React from "react";
import "./Search.css";

const Search = ({ setCityName, citySearchData, setCityData, setModal }) => {
  const handleCity = (e) => setCityName(e.target.value);

  const handleCityData = (city) => {
    setCityData({ name: city.name, lat: city.lat, lon: city.lon });
    setModal({ visible: false, isSearch: false })
  }

  return (
    <div className="searchContainer">
      <div className="searchBarContainer">
        <input
          type="text"
          className="searchBar"
          placeholder="ex: Buenos Aires, Argentina"
          onChange={handleCity}
        />
        <p>*For searching by state or country, divide by comma.</p>
      </div>
      <div className="resultsContainer">
        {citySearchData?.map((city, index) => (
          <div
            key={index}
            className="resultCityItem"
            onClick={() => handleCityData(city)}
          >
            <p className="resultCityName">
              {city.name}, {city.state ? `${city.state}, ` : ""}
              {city.country}
            </p>
            <p className="resultCityCoordenates">
              {city.lat}, {city.lon}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Search };
