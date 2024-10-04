export const getDate = (data) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  if (data.year && data.month && data.day && data.dayOfWeek) {
    const { year, month, day, dayOfWeek } = data;
    const monthName = monthNames[month - 1];
    return `${dayOfWeek} ${day}, ${monthName} ${year}`;
  }

  if (data.dt) {
    const date = new Date(data.dt * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const dayOfWeek = dayNames[date.getDay()];
    const monthName = monthNames[month];

    return `${dayOfWeek} ${day}, ${monthName} ${year}`;
  }
};
