import axios from "axios";
import { useCallback, useState } from "react";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  const getWeatherData = useCallback(async (city) => {
    try {
      setWeatherLoading(true);
      setWeatherError(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            lat: city.lat,
            lon: city.lon,
            appid: apiKey,
            units: "metric",
          },
        }
      );
      setWeatherData({
        temp: response.data.main,
        weather: response.data.weather[0],
        wind: response.data.wind.speed
      });
    } catch (error) {
      setWeatherError("An error occurred");
      setWeatherData(null);
    } finally {
      setWeatherLoading(false);
    }
  }, []);

  return { weatherData, weatherLoading, getWeatherData, weatherError };
};
