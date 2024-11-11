import axios from "axios";
import { useCallback, useState } from "react";

export const useTime = () => {
  const [timeData, setTimeData] = useState(null);
  const [timeLoading, setTimeLoading] = useState(false);

  const getTimeData = useCallback(async (city) => {
    try {
      setTimeLoading(true);
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
      setTimeLoading(false);
    }
  }, []);

  return { timeData, timeLoading, getTimeData };
};
