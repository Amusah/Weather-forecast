export default class Utilities{
  toggleNav(e){
    const navBar = document.querySelector('.navbar');
    const navToggler = navBar.querySelector('.nav-toggler');
    const { target } = e;
    if(target.classList.contains('nav-toggler') || target.classList.contains('nav-toggler__icon')){
      // console.log('clicked')
      navToggler.classList.toggle('toggle');
      navBar.classList.toggle('scale-nav');
    }
  }

  showSpinner(){
    const spinner = document.querySelector('.loading');
  }

  throwError(msg1, msg2){
    const messageBox = document.querySelector('.msg-box');
    const html = `
      <h2 class="msg-head">${msg1}</h2>
      <p class="msg">${msg2 || ''}</p>
    `;
    messageBox.insertAdjacentHTML('beforeend', html);
    messageBox.classList.toggle('hidden');
  }

  renderCurrentForecast(data){
    const currentCondition = document.querySelector('.current-weather-info');
    const dayForecast = document.querySelector('.day-forecast__container');
    const { location, current, forecast } = data;
    const hourlyForecast = forecast.forecastday[0]?.hour;
    // console.log(hourlyForecast);
    let date = this.parseDate(location.localtime);
    let html = [`
      <div class="current-weather-info__text">
        <span>
          <h2 class="city-name">${location.name}</h2>
          <p>${date.day}, ${date.time}</p>
        </span>
        <img class="current-weather-info__icon-1" src="${current.condition.icon}" alt="weather-icon">
        <h1 class="current-temp">${current.temp_c}&deg;</h1>
      </div>
      <img class="current-weather-info__icon" src="${current.condition.icon}" alt="weather-icon">
    `,

    `
      <div class="day-forecast__data 6:00AM">
        <p class="day-forecast__time">6:00 AM</p>
        <img class="day-forecast__icon" src="assets/icons/cloudy.svg" alt="weather-icon">
        <p class="day-forecast__temp">25&deg;</p>
      </div>
      <div class="day-forecast__data 9:00AM">
        <p class="day-forecast__time">9:00 AM</p>
        <img class="day-forecast__icon" src="assets/icons/partly-cloudy-day.svg" alt="weather-icon">
        <p class="day-forecast__temp">28&deg;</p>
      </div>
      <div class="day-forecast__data 12:00PM">
        <p class="day-forecast__time">12:00 PM</p>
        <img class="day-forecast__icon" src="assets/icons/rainy.svg" alt="weather-icon">
        <p class="day-forecast__temp">33&deg;</p>
      </div>
      <div class="day-forecast__data 3:00PM">
        <p class="day-forecast__time">3:00 PM</p>
        <img class="day-forecast__icon" src="assets/icons/clear-day.svg" alt="weather-icon">
        <p class="day-forecast__temp">34&deg;</p>
      </div>
      <div class="day-forecast__data 6:00PM">
        <p class="day-forecast__time">9:00 PM</p>
        <img class="day-forecast__icon" src="assets/icons/partly-cloudy-day.svg" alt="weather-icon">
        <p class="day-forecast__temp">28&deg;</p>
      </div>
      <div class="day-forecast__data 9:00PM">
        <p class="day-forecast__time">12:00 AM</p>
        <img class="day-forecast__icon" src="assets/icons/partly-cloudy-night.svg" alt="weather-icon">
        <p class="day-forecast__temp">24&deg;</p>
      </div>
    `];

    currentCondition.insertAdjacentHTML('beforeend', html[0]);
    // dayForecast.insertAdjacentHTML('beforeend', html[1])
  }

  parseDate(dateString){
    const [localDate, localTime] = dateString.split(' ');
    // convert date to day name
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(localDate).getDay();
    const day = days[d];

    // convert time to 12hr format
    const time = new Date(`${localDate} ${localTime}`).toLocaleTimeString('en-US', 
    {timeZone: 'UTC', hour12:true, hour: 'numeric', minute: 'numeric'});

    return {day, time}
  }
  
}