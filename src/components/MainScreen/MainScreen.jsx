import React, { useEffect, useState } from "react";
import "./MainScreen.css";
import { Modal } from "../Modal/Modal";

import { useSearchCity } from "../../hooks/useSearchCity";
import { useWeather } from "../../hooks/useWeather";
import { useTime } from "../../hooks/useTime";
import { getDate } from "../../utils/getDate";
import { useClock } from "../../hooks/useClock";

import { FaMapMarkerAlt, FaSyncAlt, FaCalendarAlt } from "react-icons/fa";
import pointRightImage from "../../assets/point right.svg";

const MainScreen = () => {
  const [modal, setModal] = useState({ visible: false, isSearch: false });
  const [cityName, setCityName] = useState();
  const [cityData, setCityData] = useState({
    name: "Buenos Aires",
    lat: -34.6075682,
    lon: -58.4370894,
  });

  const { weatherData, getWeatherData } = useWeather();
  const { citySearchData, getCitySearchData } = useSearchCity();
  const { temp, feels_like } = weatherData?.temp || {};
  const weather = weatherData?.weather?.main;

  const { timeData, getTimeData } = useTime();

  useEffect(() => {
    cityName && getCitySearchData(cityName);
  }, [cityName, getCitySearchData]);

  useEffect(() => {
    getWeatherData(cityData);
    getTimeData(cityData);
  }, [cityData, getWeatherData, getTimeData]);

  useEffect(() => {
    console.log(timeData);
  }, [timeData]);

  const openSearchModal = () => setModal({ visible: true, isSearch: true });
  const openForecastModal = () => setModal({ visible: true, isSearch: false });
  const handleSyncButton = () => getWeatherData(cityData);

  return (
    <div className="mainContainer">
      <div className="mainContent flex">
        <div className="backgroundImage flex">
          <CityInfo
            city={cityData.name}
            onSearchClick={openSearchModal}
            onForecastClick={openForecastModal}
            onSyncClick={handleSyncButton}
          />
          <WeatherInfo
            temp={temp}
            feelsLike={feels_like}
            weather={weather}
            timeData={timeData}
          />
        </div>
        <VideoEmbed />
      </div>
      {modal.visible && (
        <Modal
          setModal={setModal}
          isSearch={modal.isSearch}
          setCityName={setCityName}
          citySearchData={citySearchData}
          setCityData={setCityData}
        />
      )}
    </div>
  );
};

const CityInfo = ({ city, onSearchClick, onSyncClick, onForecastClick }) => (
  <div className="cityContainer flex">
    <div className="city flex">
      <FaMapMarkerAlt className="cityIcon map" />
      <span onClick={onSearchClick}>{city}</span>
      <FaSyncAlt className="cityIcon sync" onClick={onSyncClick} />
    </div>
    <div className="dailyForecastButton flex">
      <img
        src={pointRightImage}
        alt="point right icon"
        className="pointRightImage"
      />
      <button className="forecastButton" onClick={onForecastClick}>
        Full Forecast
      </button>
    </div>
  </div>
);

const WeatherInfo = ({ temp, feelsLike, weather, timeData }) => (
  <div className="forecastContainer flex">
    <div className="currentWeather">
      <p className="temperature">{Math.round(temp)}°c</p>
      <p className="feelsLike">Feels like: {Math.round(feelsLike)}°c</p>
      <p className="weather">
        <span>{weather}</span>
      </p>
    </div>
    <div className="border"></div>
    <CurrentTime timeData={timeData} />
  </div>
);

const CurrentTime = ({ timeData }) => {
  const { formattedTime } = useClock(timeData);
  const formattedDate = timeData ? getDate(timeData) : "";

  return (
    <div className="currentTime">
      <p className="clock">{formattedTime}</p>
      <p className="date">
        <FaCalendarAlt className="dateIcon" />
        <span>{formattedDate}</span>
      </p>
    </div>
  );
};

const VideoEmbed = () => (
  <div className="videoContainer flex">
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/UYdLLgKCm3Q?si=dPkhfKBm3mfYM9UE"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
);

export { MainScreen };
