import axios from "axios";
import { useCallback, useState } from "react";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const useDailyWeather = () => {
  const [dailyWeatherData, setDailyWeatherData] = useState(null);
  const [dailyWeatherLoading, setDailyWeatherLoading] = useState(false);

  // Group weather data by day
  const groupByDay = useCallback((list) => 
    list.reduce((acc, item) => {
      const date = item.dt_txt.split(" ")[0];
      acc[date] = acc[date] || [];
      acc[date].push(item);
      return acc;
    }, {})
  , []);

  // Calculate daily weather
  const calculateDailyWeather = useCallback((groupedData) => 
    Object.keys(groupedData).map((date) => {
      const dayData = groupedData[date];
      const temps = dayData.map(item => Math.round(item.main.temp));
      const maxTemp = Math.max(...temps);
      const minTemp = Math.min(...temps);

      const weatherCount = dayData.reduce((acc, item) => {
        acc[item.weather[0].main] = (acc[item.weather[0].main] || 0) + 1;
        return acc;
      }, {});
      const predominantWeather = Object.keys(weatherCount).reduce((a, b) => weatherCount[a] > weatherCount[b] ? a : b);

      return { date, dt: dayData[0].dt, maxTemp, minTemp, predominantWeather };
    })
  , []);

  // Fetch daily weather
  const getDailyWeather = useCallback(async (city) => {
    setDailyWeatherLoading(true);
    try {
      const { data } = await axios.get(
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

      const groupedData = groupByDay(data.list);
      const dailyWeather = calculateDailyWeather(groupedData);

      const todayString = new Date().toISOString().split("T")[0];

      const fiveDayForecast = dailyWeather
        .filter((data) => data.date >= todayString)
        .slice(0, 5);

      setDailyWeatherData(fiveDayForecast);
    } catch (error) {
      console.error("Error fetching city data", error);
    } finally {
      setDailyWeatherLoading(false);
    }
  }, [groupByDay, calculateDailyWeather]);

  return { dailyWeatherData, dailyWeatherLoading, getDailyWeather };
};
