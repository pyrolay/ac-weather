import { useEffect, useState, useRef } from "react";
import { getVideo } from "../../utils/getVideo";

import "../MainScreen/MainScreen.css"

const YoutubeEmbed = ({ formattedTime, weatherData }) => {
  const [videoId, setVideoId] = useState("TESqvot52Z8");
  const [savedHour, setSavedHour] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const initializePlayer = () => {
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 0,
          loop: 1,
          playlist: videoId,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
        },
      });
    };

    // Check if YT API is loaded, if not, add the script
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  // Update video ID when time or weather changes
  useEffect(() => {
    const currentHour = formattedTime?.substring(0, 2);
    if (currentHour !== savedHour) {
      const weather = weatherData?.weather?.id;
      const newVideoId = getVideo(formattedTime, weather);
      setVideoId(newVideoId);
      setSavedHour(currentHour);

      if (playerRef.current && playerRef.current.loadVideoById) {
        playerRef.current.loadVideoById(newVideoId);
      }
    }
  }, [formattedTime, weatherData, savedHour]);

  return <div id="youtube-player" style={{ height: "100%" }}></div>;
};

export { YoutubeEmbed };