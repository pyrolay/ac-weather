import React, { useState } from "react";

import "./MainScreen.css";

import { Modal } from "../Modal/Modal";

import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSyncAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

import pointRightImage from "../../assets/point right.svg";

const MainScreen = () => {
  const [city, setCity] = useState("Buenos Aires");

  const [modal, setModal] = useState({ visible: false, isSearch: false });

  return (
    <div className="mainContainer">
      <div className="mainContent flex">
        <div className="backgroundContainer flex">
          <div className="dataContainer flex">
            <div className="cityContainer flex">
              <div className="city flex">
                <FaMapMarkerAlt className="cityIcon map" />
                <span
                  onClick={() => setModal({ visible: true, isSearch: true })}
                >
                  {city}
                </span>
                <FaSyncAlt className="cityIcon sync" />
              </div>
              <div className="dailyForecastButton flex">
                <img
                  src={pointRightImage}
                  alt="point right icon"
                  className="pointRightImage"
                />
                <button
                  className="forecastButton"
                  onClick={() => setModal({ visible: true, isSearch: false })}
                >
                  Full Forecast
                </button>
              </div>
            </div>

            <div className="forecastContainer flex">
              <div className="currentWeather">
                <p className="temperature">20°c</p>
                <p className="feelsLike">feel like: 22°c</p>
                <p className="weather">
                  <img src="" alt="" />
                  <span>sunny</span>
                </p>
              </div>

              <div className="border"></div>

              <div className="currentTime">
                <p className="clock">13:00</p>
                <p className="date">
                  <FaCalendarAlt className="dateIcon" />
                  <span>Wed 3, Sep</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="videoContainer flex">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/UYdLLgKCm3Q?si=dPkhfKBm3mfYM9UE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      {modal.visible && <Modal setModal={setModal} isSearch={modal.isSearch} />}
    </div>
  );
};

export { MainScreen };

/* 
  const { weatherData, getWeatherData } = useWeather();

  useEffect(() => {
    const city = { lat: -34.6075682, lon: -58.4370894 };
    getWeatherData(city);
  }, [getWeatherData]);

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]); 
  
  {weatherData && getDate(weatherData.dt, weatherData.timezone)}
  */
