// I am used lib 'date-and-time' to format date and time

const months = ["January", "February", "March", "April", "May", "June", "July"];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getDay = (date) => {
  return days[date.getDay()];
};

const getMonth = (date) => {
  return months[date.getMonth()];
};

const getFormattedDate = (date) => {
  return `${getDay(date)}, ${getMonth(date)} ${date.getDate()}`;
};
