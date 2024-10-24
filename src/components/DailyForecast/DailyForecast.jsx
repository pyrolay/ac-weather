import React, { useEffect } from "react";

import "./DailyForecast.css";

import { Error } from "../Error/Error";

import { useClock } from "../../hooks/useClock";
import { useDailyWeather } from "../../hooks/useDailyWeather";
import { getDate } from "../../utils/getDate";

import { ClipLoader } from "react-spinners";

import { IoIosWater } from "react-icons/io";
import { FaWind } from "react-icons/fa";

const DailyForecast = ({ weatherData, cityData, timeData }) => {
  const { formattedTime } = useClock(timeData);
  const {
    dailyWeatherData,
    dailyWeatherLoading,
    getDailyWeather,
    errorDailyWeather,
  } = useDailyWeather();

  useEffect(() => {
    if (cityData) getDailyWeather(cityData);
  }, [getDailyWeather, cityData]);

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
              <p>{weatherData.weather.main}</p>
              <img className="weatherImageIcon" src={`https://openweathermap.org/img/wn/${weatherData.weather.icon}@2x.png`} alt="" />
            </div>
            <div className="todayHumidity">
              <IoIosWater  className="humidityIcon" />
              <p>{weatherData.temp.humidity}%</p>
            </div>
            <div className="todayWind">
              <FaWind className="windIcon" />
              <p>{weatherData.wind} m/s</p>
            </div>
          </div>
          <div className="todayFeelLikeMinMax">
            <p>Feels like: {Math.round(weatherData.temp.feels_like)}°c</p>
            <p>
              {Math.round(weatherData.temp.temp_min)}° /{" "}
              {Math.round(weatherData.temp.temp_max)}°
            </p>
          </div>
        </div>
      </div>
      <div className="dailyForecastResult">
        <p className="forecastTitle">5-day Forecast</p>
        <div className="dailyForecastResultContainer">
          {dailyWeatherLoading ? (
            <ClipLoader size={50} />
          ) : (
            errorDailyWeather && <Error error={errorDailyWeather} />
          )}
          {!dailyWeatherLoading &&
            dailyWeatherData &&
            dailyWeatherData.map((day) => (
              <div className="dailyForecast" key={day.date}>
                <p className="dailyForecastDay">{getDate(day)}</p>
                <div className="dailyForecastWeather">
                  <p>{day.predominantWeather}</p>
                </div>
                <div className="dailyForecastWeather">
                  <img className="weatherImageIcon" src={`https://openweathermap.org/img/wn/${day.dayWeatherIcon}@2x.png`} alt="" />
                </div>
                <p className="dailyForecastMinMax">
                  {day.minTemp}° / {day.maxTemp}°
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export { DailyForecast };
