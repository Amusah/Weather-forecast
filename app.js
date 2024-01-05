// 'use strict';
import Utilities from './utils.js';


const navBar = document.querySelector('.navbar');

// const navToggler = navBar.querySelector('.nav-toggler');

const utils = new Utilities();

class App {
  #apiKeys = {
    currentForecastApi: 'bbb40dd6bd47451d83f140902230306',
    futureForecastApi : 'TJJ852M4XXSA9Y5XRWETDERQK',
    geoCodeApi : '788221805148350681091x86622'
  }
  currentCity;

  constructor(){
    navBar.addEventListener('click', utils.toggleNav);
  }

  fetchAndParseData(url, errMsg = 'Something went wrong'){
    return fetch(url).then(res => {
      if(!res.ok){
        utils.throwError(errMsg, res.status);
        return;
      }
      return res.json();
    })
  }

  getCurrentLocation(){
    let currentCity;
    if(!navigator.geolocation) return;

    return navigator.geolocation.getCurrentPosition(pos => {
      console.log(pos)
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      this.reverseGeocode(latitude, longitude)
      .then(data => this.getWeatherForcast(data.city))
      .then(weatherData => console.log(weatherData))
      .catch(err => {
        console.log(err.message)
        utils.throwError(err.message, 'Something went wrong')
      })
      
    }, (err) => {
      if(err)
      utils.throwError('can\'t get location', 'enable device\'s location');
    });
  }

  reverseGeocode(lat, lon){
    return this.fetchAndParseData(`https://geocode.xyz/${lat},${lon}?geoit=json&auth=${this.#apiKeys.geoCodeApi}`)
  }

  async getWeatherForcast(city){
    let curData = this.fetchAndParseData(`http://api.weatherapi.com/v1/forecast.json?key=${this.#apiKeys.currentForecastApi}&q=${city}&aqi=no`)
    let futureData = this.fetchAndParseData(`
        https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${this.#apiKeys.futureForecastApi}&contentType=json
      `);

    return await Promise.all([curData, futureData]);
  }

}

const weatherApp = new App();
// weatherApp.getCurrentLocation();
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Takoradi?unitGroup=metric&key=TJJ852M4XXSA9Y5XRWETDERQK&contentType=json
// 'TJJ852M4XXSA9Y5XRWETDERQK'

// goecode api
// '788221805148350681091x86622'
// 'https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=your_api_key'
// http://api.weatherapi.com/v1/current.json?key=bbb40dd6bd47451d83f140902230306&q=Takoradi&aqi=no

