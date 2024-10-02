import React, { useEffect } from "react";

import "./DailyForecast.css";
import { useClock } from "../../hooks/useClock";
import { useDailyWeather } from "../../hooks/useDailyWeather";

const DailyForecast = ({ weatherData, cityData, timeData }) => {
  const { formattedTime } = useClock(timeData);

  const { dailyWeatherData, getDailyWeather } = useDailyWeather();

  useEffect(() => {
    getDailyWeather(cityData)
  }, [getDailyWeather, cityData])

  useEffect(() => {
    console.log(dailyWeatherData);
  }, [dailyWeatherData]);

  return (
    <div className="dailyForecastContainer">
      <div className="todayForecast">
        <p className="forecastTitle">Today Forecast</p>
        <div className="todayForecastInfo">
          <div className="todayForecastCurrent">
            <p className="todayForecastTemp">
              {Math.round(weatherData.temp.temp)}°c
            </p>
            <div className="todayForecastCity">
              <p className="todayForecastCityName">{cityData.name}</p>
              <p>{formattedTime}</p>
            </div>
          </div>
          <div className="todayForecastMain">
            <div className="todayWeather">
              <img src="" alt="" />
              <p>{weatherData.weather.main}</p>
            </div>
            <div className="todayHumidity">
              <img src="" alt="" />
              <p>{weatherData.temp.humidity}</p>
            </div>
            <div className="todayWind">
              <img src="" alt="" />
              <p>{weatherData.wind} m/s</p>
            </div>
          </div>
          <div className="todayFeelLikeMinMax">
            <p>Feel like: {Math.round(weatherData.temp.feels_like)}°c</p>
            <p>
              {Math.round(weatherData.temp.temp_min)}° to{" "}
              {Math.round(weatherData.temp.temp_max)}°
            </p>
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
