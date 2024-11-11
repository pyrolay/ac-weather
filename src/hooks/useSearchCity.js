import axios from "axios";
import { useState, useCallback } from "react";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const useSearchCity = () => {
  const [citySearchData, setCitySearchData] = useState(null);
  const [cityLoading, setCityLoading] = useState(false);
  const [errorCity, setErrorCity] = useState(null);

  const getCitySearchData = useCallback(async (city) => {
    if (!city) return;
    try {
      setCityLoading(true);
      setErrorCity(null);
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
      setErrorCity("There is an error! Please try later")
      setCitySearchData(null)
    } finally {
      setCityLoading(false);
    }
  }, []);

  return { citySearchData, cityLoading, getCitySearchData, errorCity };
};