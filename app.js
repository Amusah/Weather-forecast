// 'use strict';
import Utilities from './utils.js';


const navBar = document.querySelector('.navbar');

// const navToggler = navBar.querySelector('.nav-toggler');

const utils = new Utilities();

class App {
  #apiKeys = {
    weatherApi : 'TJJ852M4XXSA9Y5XRWETDERQK',
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
    if(!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(pos => {
      console.log(pos)
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      // Reverse Geocoding
      this.fetchAndParseData(`https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=${this.#apiKeys.geoCodeApi}`)
      .then(data => {
        console.log(data.city)
      })
      
    }, (err) => {
      if(err)
      utils.throwError('Location not found', 'Enable device\'s location');
    });
  }

  getWeatherForcast(){}

}

const weatherApp = new App();
weatherApp.getCurrentLocation();
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Takoradi?unitGroup=metric&key=TJJ852M4XXSA9Y5XRWETDERQK&contentType=json
// 'TJJ852M4XXSA9Y5XRWETDERQK'

// goecode api
// '788221805148350681091x86622'
// 'https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=your_api_key'