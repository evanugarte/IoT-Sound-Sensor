const days = ["Sunday","Monday","Tuesday",
  "Wednesday","Thursday","Friday",
  "Saturday"];

export const getDay = () => {
  let d = new Date();
  return days[d.getDay()];
};

export const getHour = () => {
  let d = new Date();
  return d.getHours().toString();
};
