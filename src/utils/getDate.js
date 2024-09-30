export const getDate = (apiData) => {
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
  
    const { year, month, day, dayOfWeek } = apiData;
  
    const monthName = monthNames[month - 1];
  
    return `${dayOfWeek} ${day}, ${monthName} ${year}`;
  };