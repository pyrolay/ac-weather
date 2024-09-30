import axios from "axios";
import { useCallback, useState } from "react";

export const useTime = () => {
  const [timeData, setTimeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getTimeData = useCallback(async (city) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://timeapi.io/api/time/current/coordinate`,
        {
          params: {
            latitude: city.lat,
            longitude: city.lon,
          },
        }
      );
      setTimeData(response.data);
    } catch (error) {
      console.error("error fetching time data", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { timeData, isLoading, getTimeData };
};
