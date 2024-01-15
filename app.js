'use strict';

import Utilities from './utils.js';
import helperFunc from './helper.js';


const navBar = document.querySelector('.navbar');
const input = document.querySelector('.city-input');
const spinner = document.querySelector('.loading');
const widgetContainer = document.querySelector('.autocomplete-container');
const currentCondition = document.querySelector('.current-weather-info');

const utils = new Utilities();
const helper = new helperFunc();

class App {
  #apiKeys = {
    currentForecastApi: 'bbb40dd6bd47451d83f140902230306',
    futureForecastApi : 'TJJ852M4XXSA9Y5XRWETDERQK',
    geoCodeApi : '394165843608160291545x9264'
  }

  constructor(){
    navBar.addEventListener('click', utils.toggleNav);
    input.addEventListener('input', helper.debounce(this.inputEvent.bind(this), 1000));
    this.getCurrentLocation();
  }

  inputEvent(e){
  let keyWord = e.target.value.trim();
    if(!keyWord){
      spinner.classList.add('hidden');
      currentCondition.classList.remove('opaque');
    } else{
      spinner.classList.remove('hidden');
      currentCondition.classList.add('opaque');
      utils.autoComplete(keyWord)
      .then(data => {
        utils.renderAutoCompleteWidget(data);
        document.addEventListener('click', this.clickEvent.bind(this));
      })
      .catch(err => {
        utils.throwError(err.message)
        console.log(err)
      })
      .finally(() => {
        spinner.classList.add('hidden');
      })
    }
  }

  clickEvent(e){
    const { target } = e;
    let cityName;
    if(target.matches('.city-list-item, .city-name__text, .country-name__text')){
      cityName = target.closest('.city-list-item').children[0].innerText;
      input.value = cityName;
      widgetContainer.replaceChildren();
      widgetContainer.classList.add('hidden');
      spinner.classList.remove('hidden');
      this.getWeatherForcast(cityName)
      .then(weatherData => {
        const [currentForecast, futureForecast] = weatherData;
        utils.renderCurrentForecast(currentForecast);
        utils.renderFutureForecast(futureForecast, currentForecast);
        spinner.classList.add('hidden');
        currentCondition.classList.remove('opaque');
        input.value = '';
      });
    } else{
      widgetContainer.classList.add('hidden');
    }
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
      utils.toggleSpinner();
      this.reverseGeocode(latitude, longitude)
      .then(data => this.getWeatherForcast(data.city))
      .then(weatherData => {
        const [currentForecast, futureForecast] = weatherData;
        console.log(currentForecast, futureForecast);
        utils.toggleSpinner();
        utils.renderCurrentForecast(currentForecast);
        utils.renderFutureForecast(futureForecast, currentForecast);
      })
      .catch(err => {
        console.log(err.message)
        utils.throwError(err.message, 'Something went wrong')
      })
      .finally(() => {
        spinner.classList.add('hidden');
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
