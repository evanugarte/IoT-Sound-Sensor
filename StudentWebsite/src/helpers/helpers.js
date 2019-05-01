const days = ["Sunday","Monday","Tuesday",
  "Wednesday","Thursday","Friday",
  "Saturday"];

export const soundSorter = (arr) => {
  return arr.sort(
    (a,b) => 
      (parseInt(a.minutes) > parseInt(b.minutes)) ? 1 : 
        ((parseInt(b.minutes) > parseInt(a.minutes)) ? -1 
          : 0)); 
};

export const soundAvg = (arr) => {
  let sum = 0;
  if(!arr.length) return sum;
  for(let i = 0; i < arr.length; i++) {
    sum += parseFloat(arr[i].sound);
  }
  sum /= arr.length;
  
  return sum;
};

export const getDay = () => {
  let d = new Date();
  return days[d.getDay()];
};

export const getHour = () => {
  let d = new Date();
  return d.getHours().toString();
};
