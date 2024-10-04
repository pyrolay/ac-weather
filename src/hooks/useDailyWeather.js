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
        `https://api.openweathermap.org/data/2.5/forecast`,
        {
          params: {
            lat: city.lat,
            lon: city.lon,
            units: "metric",
            appid: apiKey,
          },
        }
      );

      const groupedData = groupByDay(response.data.list);
      const dailyTemperatures = calculateDailyTemperatures(groupedData);

      setDailyWeatherData(dailyTemperatures);
    } catch (error) {
      console.error("error fetching city data", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const groupByDay = (list) => {
    return list.reduce((acc, item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  const calculateDailyTemperatures = (groupedData) => {
    return Object.keys(groupedData).map((date) => {
      const temps = groupedData[date].map((item) => Math.round(item.main.temp));
      const maxTemp = Math.max(...temps);
      const minTemp = Math.min(...temps);
      return { date, maxTemp, minTemp };
    });
  };

  return { dailyWeatherData, isLoading, getDailyWeather };
};
