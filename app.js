// 'use strict';
import Utilities from './utils.js';


const navBar = document.querySelector('.navbar');
// const navToggler = navBar.querySelector('.nav-toggler');

const utils = new Utilities();

class App {
  constructor(){
    navBar.addEventListener('click', utils.toggleNav);
  }

  getCurrentLocation(){
    if(!navigator.geolocation) return
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const getCoordinates = pos => {
      console.log(pos)
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
    }

    const error = err => {
      // console.log(err)
      alert(`Could not get your current location, please enable your device's location `);
    }

    navigator.geolocation.getCurrentPosition(getCoordinates, error);
  }

}

const weatherApp = new App();
weatherApp.getCurrentLocation()
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Takoradi?unitGroup=metric&key=TJJ852M4XXSA9Y5XRWETDERQK&contentType=json
// 'TJJ852M4XXSA9Y5XRWETDERQK'