import { weather } from './weather.js';
import { ui } from './ui.js';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const currentBtn = document.querySelector('#today');
const forecastBtn = document.querySelector('#forecast');
const tempBtn = document.querySelector('#temp');
//Init coords
let coords;

// FUNCTIONS

// Get coordiantes of current location,  save in session storage and display weather data
function coordsData() {
  // If user allows get coords
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      coords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      };

      sessionStorage.setItem('coords', JSON.stringify(coords));
      // Display weather for current coords
      weather.getCurrentCoords(coords).then(data => {
        ui.displayData(data);
      });
    });
  }
}

// Display current weather for city from input field; if not found display err
function currentCity(city) {
  weather
    .getCurrent(city)
    .then(data => {
      ui.displayData(data);
    })
    .catch(() => {
      ui.err('Please enter a valid city name');
      ui.clearUI();
      input.value = '';
      getCurrent(city);
    });
}

// Display date for city based on geolocation coords
function currentCoords(coords) {
  weather
    .getCurrentCoords(coords)
    .then(data => {
      ui.displayData(data);
    })
    .catch(err => {
      console.error(err);
      input.value = '';
    });
}

// Forecast for city from input field
function forecastCity(city) {
  weather
    .getForecast(city)
    .then(forecast => {
      ui.displayForecast(forecast);
    })
    .catch(err => {
      console.error(err);
      input.value = '';
    });
}

// Forecast for geolocation coords
function forecastCoords(coords) {
  weather
    .getForecastCoords(coords)
    .then(forecast => {
      ui.displayForecast(forecast);
    })
    .catch(err => {
      console.error(err);
      input.value = '';
    });
}

// Change temoerature and update weather related units
function tempChange() {
  if (tempBtn.textContent === '°C') {
    tempBtn.textContent = '°F';
    // Change the units and temperature sign
    weather.units = 'imperial';
    ui.locale = 'en-US';
    ui.changeTempSign('°F');
  } else {
    tempBtn.textContent = '°C';
    weather.units = 'metric';
    ui.locale = 'en-GB';
    ui.changeTempSign('°C');
  }
}

// EVENT LISTENERS

// On load get coords.
window.addEventListener('DOMContentLoaded', coordsData);

// Display data for city from input field
form.addEventListener('submit', e => {
  const city = input.value;

  city ? currentCity(city) : ui.err('Please enter a city name');

  currentBtn.classList.add('active-btn');
  forecastBtn.classList.remove('active-btn');
  e.preventDefault();
});

// Current forecast btn.
currentBtn.addEventListener('click', () => {
  const city = input.value;
  coords = JSON.parse(sessionStorage.getItem('coords'));
  // If no coords and input field is empty - return
  if (!coords && !city) return ui.err('Please enable geolocation or enter city name');
  // If cooords exist display data for current coord else display data for city from input field
  coords && !city ? currentCoords(coords) : currentCity(city);

  currentBtn.classList.add('active-btn');
  forecastBtn.classList.remove('active-btn');
});

// Get the 5 days forcast for the city
forecastBtn.addEventListener('click', () => {
  const city = input.value;
  coords = JSON.parse(sessionStorage.getItem('coords'));

  if (!coords && !city) return ui.err('Please enable geolocation or enter city name');

  coords && city ? forecastCity(city) : forecastCoords(coords);

  forecastBtn.classList.add('active-btn');
  currentBtn.classList.remove('active-btn');
});

// If input field is empty, clear data;
input.addEventListener('keyup', function() {
  if (this.value === '') {
    ui.clearUI();

    coords = JSON.parse(sessionStorage.getItem('coords'));

    // Get the  weather data of current location
    currentCoords(coords);

    currentBtn.classList.add('active-btn');
    forecastBtn.classList.remove('active-btn');
  }
});

// Toggle between C or F, GB or US date format, and update weather data
tempBtn.addEventListener('click', () => {
  const city = input.value;
  coords = JSON.parse(sessionStorage.getItem('coords'));

  if (!coords & !city) return ui.err('Please enable geolocation or enter city name');

  // Check what is currently displayed (current or forecast) then update currently displayed data
  if (coords && !city) {
    //update temperature and date format
    tempChange();
    currentBtn.classList.contains('active-btn') ? currentCoords(coords) : forecastCoords(coords);
  } else {
    tempChange();
    currentBtn.classList.contains('active-btn') ? currentCity(city) : forecastCity(city);
  }
});
