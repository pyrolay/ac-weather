import { useEffect, useState } from "react";

export const useClock = (timeData) => {
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    if (!timeData) {
      setCurrentTime(null);
      return;
    }

    const { year, month, day, hour } = timeData;

    // Initialize the time with the hour from the API and minutes/seconds from the system
    const syncTimeWithRealMinutesAndSeconds = () => {
      const realTime = new Date();
      const syncedTime = new Date(
        year,
        month - 1,
        day,
        hour, // Use the hour from the API
        realTime.getMinutes(), // Use current system minutes
        realTime.getSeconds() // Use current system seconds
      );
      setCurrentTime(syncedTime);
    };

    syncTimeWithRealMinutesAndSeconds();

    const interval = setInterval(() => {
      setCurrentTime((prevTime) => new Date(prevTime.getTime() + 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeData]);

  const formattedTime = currentTime?.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { formattedTime };
};