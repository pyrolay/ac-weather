import { useEffect, useState } from "react";
import { getVideo } from "../../utils/getVideo";

const YoutubeEmbed = ({ formattedTime, weatherData }) => {
  const [videoId, setVideoId] = useState("");
  const [savedHour, setSavedHour] = useState(null);

  useEffect(() => {
    const currentHour = formattedTime.substring(0, 2);

    // Check if the current hour is different from the saved hour
    if (currentHour !== savedHour) {
      const weather = weatherData?.weather?.id;
      const newVideoId = getVideo(formattedTime, weather);
      
      setVideoId(newVideoId);
      setSavedHour(currentHour);
    }
  }, [formattedTime, weatherData, savedHour]);

  return (
    <div>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export { YoutubeEmbed };
