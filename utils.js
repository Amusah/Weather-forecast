'use strict';

import helperFunc from './helper.js';
const helper = new helperFunc();

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

  toggleSpinner(){
    const spinner = document.querySelector('.loading');
    spinner.classList.toggle('hidden');
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
    const airCondition = document.querySelector('.air-conditions__container');
    const sky = document.getElementById('bg');
    const { location, current, forecast } = data;
    const hourlyForecast = forecast.forecastday[0]?.hour;
    // console.log(hourlyForecast);
    let date = helper.parseDate(location.localtime);
    let html = [`
      <div class="current-weather-info__text">
        <span>
          <h2 class="city-name">${location.name}</h2>
          <p>${date.day}, ${date.time}</p>
        </span>
        <img class="current-weather-info__icon-1" src="${current.condition.icon}" alt="weather-icon">
        <h1 class="current-temp">${Math.floor(current.temp_c)}&deg;</h1>
      </div>
      <img class="current-weather-info__icon" src="${current.condition.icon}" alt="weather-icon">
    `,

    `
      <div class="day-forecast__data 6:00AM">
        <p class="day-forecast__time">6:00 AM</p>
        <img class="day-forecast__icon" src="${hourlyForecast[6].condition.icon}" alt="weather-icon">
        <p class="day-forecast__temp">${Math.floor(hourlyForecast[6].temp_c)}&deg;</p>
      </div>
      <div class="day-forecast__data 9:00AM">
        <p class="day-forecast__time">9:00 AM</p>
        <img class="day-forecast__icon" src="${hourlyForecast[9].condition.icon}" alt="weather-icon">
        <p class="day-forecast__temp">${Math.floor(hourlyForecast[9].temp_c)}&deg;</p>
      </div>
      <div class="day-forecast__data 12:00PM">
        <p class="day-forecast__time">12:00 PM</p>
        <img class="day-forecast__icon" src="${hourlyForecast[12].condition.icon}" alt="weather-icon">
        <p class="day-forecast__temp">${Math.floor(hourlyForecast[12].temp_c)}&deg;</p>
      </div>
      <div class="day-forecast__data 3:00PM">
        <p class="day-forecast__time">3:00 PM</p>
        <img class="day-forecast__icon" src="${hourlyForecast[15].condition.icon}" alt="weather-icon">
        <p class="day-forecast__temp">${Math.floor(hourlyForecast[15].temp_c)}&deg;</p>
      </div>
      <div class="day-forecast__data 6:00PM">
        <p class="day-forecast__time">6:00 PM</p>
        <img class="day-forecast__icon" src="${hourlyForecast[18].condition.icon}" alt="weather-icon">
        <p class="day-forecast__temp">${Math.floor(hourlyForecast[18].temp_c)}&deg;</p>
      </div>
      <div class="day-forecast__data 9:00PM">
        <p class="day-forecast__time">9:00 PM</p>
        <img class="day-forecast__icon" src="${hourlyForecast[21].condition.icon}" alt="weather-icon">
        <p class="day-forecast__temp">${Math.floor(hourlyForecast[21].temp_c)}&deg;</p>
      </div>
    `,

    `
      <div class="air-conditions__data">
        <div class="reel-feel">
          <span class="reel-feel__info-box">
            <img class="thermometer__icon" src="assets/icons/thermometer.svg" alt="thermometer-icon">
            <p class="reel-feel__text">Real Feel</p>
          </span>
          <h2 class="reel-feel__value">${Math.floor(current.feelslike_c)}&deg;</h2>
        </div>
        <div class="chance-of-rain">
          <span class="chance-of-rain__info-box">
            <img class="rain__icon" src="assets/icons/raindrop.svg" alt="raindrop icon">
            <p class="rain__text">Chance of rain</p>
          </span>
          <h2 class="rain__percentage">${Math.floor(current.precip_in)}%</h2>
        </div>
      </div>
      <div class="air-conditions__data">
        <div class="wind-speed">
          <span class="wind-speed__info-box">
            <img class="wind-speed__icon" src="assets/icons/wind-beaufort-0.svg" alt="wind-icon">
            <p class="wind-text">Wind Speed</p>
          </span>
          <h2 class="wind-speed__value">${current.wind_kph} km/h</h2>
        </div>
        <div class="uv-index">
          <span class="uv-index__info-box">
            <img class="uv__icon" src="assets/icons/uv-index.svg" alt="sun">
            <p class="uv-text">UV Index</p>
          </span>
          <h2 class="uv-index__value">${current.uv}</h2>
        </div>
      </div>
    `];

    currentCondition.insertAdjacentHTML('beforeend', html[0]);
    dayForecast.insertAdjacentHTML('beforeend', html[1]);
    airCondition.insertAdjacentHTML('beforeend', html[2]);
    if(current.is_day === 0){
      sky.style.backgroundImage = `url('/assets/img/night.jpg')`;
    }
    helper.saveWeatherData('currentForecast', html)
  }

  renderFutureForecast(data, today){
    const futureForecast = document.querySelector('.future-forecast__container');
    const { days } = data;
    const { current } = today;

    let html = `
      <div class="future-forecast__data today+0">
        <p class="future-forecast__day">Today</p>
        <span class="future-forecast__info">
          <img src="${current.condition.icon}" alt="weather-icon" class="future-forecast__icon">
          
        </span>
        <p class="future-forecast__temp">${current.temp_c}&deg;</p>
      </div>
      <div class="future-forecast__data today+1">
        <p class="future-forecast__day">${helper.parseDate(days[1].datetime).day.substring(0, 3)}</p>
        <span class="future-forecast__info">
          <img src="assets/icons/${days[1].icon}.svg" alt="weather-icon" class="future-forecast__icon">
        </span>
        <p class="future-forecast__temp">${Math.floor(days[1].temp)}&deg;</p>
      </div>
      <div class="future-forecast__data today+2">
        <p class="future-forecast__day">${helper.parseDate(days[2].datetime).day.substring(0, 3)}</p>
        <span class="future-forecast__info">
          <img src="assets/icons/${days[2].icon}.svg" alt="weather-icon" class="future-forecast__icon">
        </span>
        <p class="future-forecast__temp">${Math.floor(days[2].temp)}&deg;</p>
      </div>
      <div class="future-forecast__data today+3">
        <p class="future-forecast__day">${helper.parseDate(days[3].datetime).day.substring(0, 3)}</p>
        <span class="future-forecast__info">
          <img src="assets/icons/${days[3].icon}.svg" alt="weather-icon" class="future-forecast__icon">
        </span>
        <p class="future-forecast__temp">${Math.floor(days[3].temp)}&deg;</p>
      </div>
      <div class="future-forecast__data today+4">
        <p class="future-forecast__day">${helper.parseDate(days[4].datetime).day.substring(0, 3)}</p>
        <span class="future-forecast__info">
          <img src="assets/icons/${days[4].icon}.svg" alt="weather-icon" class="future-forecast__icon">
        </span>
        <p class="future-forecast__temp">${Math.floor(days[4].temp)}&deg;</p>
      </div>
      <div class="future-forecast__data today+5">
        <p class="future-forecast__day">${helper.parseDate(days[5].datetime).day.substring(0, 3)}</p>
        <span class="future-forecast__info">
          <img src="assets/icons/${days[5].icon}.svg" alt="weather-icon" class="future-forecast__icon">
        </span>
        <p class="future-forecast__temp">${Math.floor(days[5].temp)}&deg;</p>
      </div>
      <div class="future-forecast__data today+6">
        <p class="future-forecast__day">${helper.parseDate(days[6].datetime).day.substring(0, 3)}</p>
        <span class="future-forecast__info">
          <img src="assets/icons/${days[6].icon}.svg" alt="weather-icon" class="future-forecast__icon">
        </span>
        <p class="future-forecast__temp">${Math.floor(days[6].temp)}&deg;</p>
      </div>
    `
    futureForecast.insertAdjacentHTML('beforeend', html);
  }
  
}