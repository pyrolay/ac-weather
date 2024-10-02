import axios from "axios";
import { useCallback, useState } from "react";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const useDailyWeather = () => {
  const [dailyWeatherData, setDailyWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getDailyWeather = useCallback(async (city) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `api.openweathermap.org/data/2.5/forecast`,
        {
          params: {
            lat: city.lat,
            lon: city.lon,
            units: "metric",
            appid: apiKey,
          },
        }
      );
      setDailyWeatherData(response.data);
    } catch (error) {
      console.error("error fetching city data", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { dailyWeatherData, isLoading, getDailyWeather };
};
