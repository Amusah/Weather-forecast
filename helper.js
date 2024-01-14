'use strict'

export default class helper {
   parseDate(dateString){
    const [localDate, localTime] = dateString.split(' ');
    // convert date to day name
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(localDate).getDay();
    const day = days[d];

    // convert time to 12hr format
    const time = new Date(`${localDate} ${localTime}`).toLocaleTimeString('en-US', 
    {timeZone: 'UTC', hour12:true, hour: 'numeric', minute: 'numeric'});

    return {day, time};
  }

  debounce(func, delay = 2000){
    let timer;
    
    return function(...args){
      if(timer)
      clearTimeout(timer);

      timer = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    }
  }

}