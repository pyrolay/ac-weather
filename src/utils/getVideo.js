import videoIds from "../mock/vidIds.json";

const defaultVideo = "TESqvot52Z8";

const getWeatherName = (id) => {
  if (id >= 200 && id < 600) {
    return "rainy";
  } else if (id === 803 || id === 804) {
    return "rainy"
  } else if (id >= 600 && id < 800) {
    return "snowy";
  } else {
    return "sunny";
  }
};

export const getVideo = (time, weatherId) => {
  const hour = time?.substring(0, 2);
  const weather = getWeatherName(weatherId);

  const videoId = videoIds[hour]?.[weather];

  return videoId || defaultVideo;
};
