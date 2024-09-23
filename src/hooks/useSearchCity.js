import axios from "axios";
import { useState, useCallback } from "react";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const useSearchCity = () => {
  const [citySearchData, setCitySearchData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCitySearchData = useCallback(async (city) => {
    if (!city) return;
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct`,
        {
          params: {
            q: city,
            appid: apiKey,
            limit: 5,
          },
        }
      );
      setCitySearchData(response.data);
    } catch (error) {
      console.error("Error fetching city data", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { citySearchData, isLoading, getCitySearchData };
};