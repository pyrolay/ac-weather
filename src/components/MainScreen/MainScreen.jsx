import React, { useEffect, useState } from "react";

import "./MainScreen.css";

import { Modal } from "../Modal/Modal";
import { YoutubeEmbed } from "../YoutubeEmbed/YoutubeEmbed";

import { useSearchCity } from "../../hooks/useSearchCity";
import { useWeather } from "../../hooks/useWeather";
import { useTime } from "../../hooks/useTime";
import { getDate } from "../../utils/getDate";
import { useClock } from "../../hooks/useClock";

import { FaMapMarkerAlt, FaSyncAlt, FaCalendarAlt } from "react-icons/fa";
import pointRightImage from "../../assets/point right.svg";

import { ClockLoader } from "react-spinners";
import { Error } from "../Error/Error";

const MainScreen = () => {
  const [modal, setModal] = useState({ visible: false, isSearch: false });
  const [cityName, setCityName] = useState();
  const [cityData, setCityData] = useState(() => {
    const storedCityData = localStorage.getItem("cityData");
    if (storedCityData) {
      return JSON.parse(storedCityData);
    }
    return {
      name: "Buenos Aires",
      lat: -34.6075682,
      lon: -58.4370894,
    };
  });

  const { weatherData, weatherLoading, getWeatherData, weatherError } =
    useWeather();
  const { citySearchData, cityLoading, getCitySearchData, errorCity } =
    useSearchCity();
  const { temp, feels_like } = weatherData?.temp || {};
  const weather = weatherData?.weather?.main;
  const weatherIcon = weatherData?.weather?.icon;

  const { timeData, timeLoading, getTimeData } = useTime();
  const { formattedTime } = useClock(timeData);

  const storeCityData = (data) => {
    try {
      localStorage.setItem("cityData", JSON.stringify(data));
      console.log("City data saved to local storage.");
    } catch (error) {
      console.error("Failed to save city data to local storage:", error);
    }
  };

  useEffect(() => {
    cityName && getCitySearchData(cityName);
  }, [cityName, getCitySearchData]);

  useEffect(() => {
    getWeatherData(cityData);
    getTimeData(cityData);
  }, [cityData, getWeatherData, getTimeData]);

  const openSearchModal = () => setModal({ visible: true, isSearch: true });
  const openForecastModal = () => setModal({ visible: true, isSearch: false });
  const handleSyncButton = () => {
    getWeatherData(cityData);
    getTimeData(cityData);
  };
  const handleCityDataUpdate = (selectedCityData) => {
    setCityData(selectedCityData);
    storeCityData(selectedCityData);
  };

  const isLoading = weatherLoading || cityLoading || timeLoading;

  return (
    <div className="mainContainer">
      <div className="mainContent flex">
        <div className="backgroundImage flex">
          <div className="cityContainer flex">
            <div className="city flex">
              <FaMapMarkerAlt className="cityIcon map" />
              <span onClick={openSearchModal}>{cityData.name}</span>
              <FaSyncAlt className="cityIcon sync" onClick={handleSyncButton} />
            </div>

            {!isLoading && !weatherError && (
              <div
                className="dailyForecastButton flex"
                onClick={openForecastModal}
              >
                <img
                  src={pointRightImage}
                  alt="point right icon"
                  className="pointRightImage"
                />
                <button className="forecastButton">Full Forecast</button>
              </div>
            )}
          </div>
          {isLoading ? (
            <ClockLoader
              size={75}
              color="#e886c3"
              className="loadingComponent flex"
            />
          ) : (
            weatherError && <Error error={weatherError} />
          )}
          {!isLoading && weatherData && (
            <WeatherInfo
              temp={temp}
              feelsLike={feels_like}
              weather={weather}
              weatherIcon={weatherIcon}
              timeData={timeData}
            />
          )}
        </div>
        <VideoEmbed formattedTime={formattedTime} weatherData={weatherData} />
        <div className="socialLinks">
          <p>
            Made by <a href="https://github.com/pyrolay" target="_blank" rel="noreferrer">Lay</a>
          </p>
        </div>
      </div>
      {modal.visible && (
        <Modal
          setModal={setModal}
          isSearch={modal.isSearch}
          setCityName={setCityName}
          citySearchData={citySearchData}
          setCityData={handleCityDataUpdate}
          weatherData={weatherData}
          cityData={cityData}
          timeData={timeData}
          errorCity={errorCity}
        />
      )}
    </div>
  );
};

const WeatherInfo = ({ temp, feelsLike, weather, weatherIcon, timeData }) => (
  <div className="forecastContainer flex">
    <div className="currentWeather">
      <p className="temperature">{Math.round(temp)}°c</p>
      <p className="feelsLike">Feels like: {Math.round(feelsLike)}°c</p>
      <p className="weather">
        <span>{weather}</span>
        <img
          className="weatherImageIcon"
          src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt=""
        />
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

const VideoEmbed = ({ formattedTime, weatherData }) => (
  <div className="videoContainer flex">
    <YoutubeEmbed formattedTime={formattedTime} weatherData={weatherData} />
  </div>
);

export { MainScreen };
