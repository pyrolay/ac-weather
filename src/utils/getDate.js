export const getDate = (data) => {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Handle custom date format
  if (data.year && data.month && data.day && data.dayOfWeek) {
    const { year, month, day, dayOfWeek } = data;
    const monthName = monthNames[month - 1];
    return `${dayOfWeek} ${day}, ${monthName} ${year}`;
  }

  // Handle dt (timestamp in seconds)
  if (data.dt) {
    const date = new Date(data.dt * 1000);
    const dayOfWeek = dayNames[date.getDay()];

    return `${dayOfWeek}`;
  }

  return "Invalid date";
};