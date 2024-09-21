import React from "react";

import "./DailyForecast.css";

const DailyForecast = () => {
  return (
    <div className="dailyForecastContainer">
      <div className="todayForecast">
        <p className="forecastTitle">Today Forecast</p>
        <div className="todayForecastInfo">
          <div className="todayForecastCurrent">
            <p className="todayForecastTemp">-1°</p>
            <div className="todayForecastCity">
              <p className="todayForecastCityName">Buenos Aires</p>
              <p>21:15</p>
            </div>
          </div>
          <div className="todayForecastMain">
            <div className="todayWeather">
              <img src="" alt="" />
              <p>Rainy</p>
            </div>
            <div className="todayHumidity">
              <img src="" alt="" />
              <p>60</p>
            </div>
            <div className="todayWind">
              <img src="" alt="" />
              <p>5.14 m/s</p>
            </div>
          </div>
          <div className="todayFeelLikeMinMax">
            <p>Feel like: -4°C</p>
            <p>-1° to 3°</p>
          </div>
        </div>
      </div>
      <div className="dailyForecastResult">
        <p className="forecastTitle">5-day Forecast</p>
        <div className="dailyForecastResultContainer">
          <div className="dailyForecast">
            <p className="dailyForecastDay">Wed</p>
            <div>
              <img src="" alt="" />
              <p>sunny</p>
            </div>
            <p className="dailyForecastMinMax">17° / 28°</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DailyForecast };