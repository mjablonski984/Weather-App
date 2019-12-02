class UI {
  constructor() {
    this.cityName = document.querySelector('#city-name');
    this.weatherIcon = document.querySelector('#weather-icon');
    this.weatherDesc = document.querySelector('#weather-desc');
    this.weatherData = document.querySelector('#weather-data');
    this.error = document.querySelector('.error');
    this.locale = 'en-GB';
    this.sign = '°C';
  }

  // Change sign - celsius or fahrenheit
  changeTempSign(sign) {
    this.sign = sign;
  }

  // Display current data

  displayData(data) {
    // console.log(data, `${data.weather[0].main}`);

    // Display city
    this.cityName.textContent = `${data.name}, ${data.sys.country}`;
    // Display icon
    this.weatherIcon.setAttribute('src', `/src/icons/${data.weather[0].icon}.svg`);
    // Weather description
    this.weatherDesc.textContent = `${data.weather[0].main}`;

    const temp = Math.floor(data.main.temp);
    const tempMin = Math.floor(data.main.temp_min);
    const tempMax = Math.floor(data.main.temp_max);
    const windSpeed = Math.floor(data.wind.speed);

    this.weatherData.innerHTML = `
        <div class="weather-data-current">
            <p>Current temperature: <span class="numerals">${temp} ${this.sign}</span></p>
            <p>Min. temperature: <span class="numerals">${tempMin} ${this.sign}</span></p>
            <p>Max. temperature: <span class="numerals">${tempMax} ${this.sign}</span></p>
            <p>Atmospheric preassure: <span class="numerals">${data.main.pressure} hPa </span></p>
            <p>Humidity: <span class="numerals">${data.main.humidity} %</span></p>
            <p>Wind: <span class="numerals">${windSpeed} km/h</span></p>
        </div>
        `;

    setTimeout(() => {
      document.querySelector('.weather-data-current').classList.add('active-current');
    }, 50);
  }

  // Display 5 days forecast
  displayForecast(forecast) {
    // Clear current weather description
    this.weatherDesc.textContent = '';

    // // Clear current weather icon
    this.weatherIcon.setAttribute('src', '');
    this.weatherIcon.setAttribute('width', '');
    this.weatherIcon.setAttribute('height', '');
    this.weatherIcon.setAttribute('alt', '');

    // Generate output
    let output = `<div class="forecast-container">`;

    // Get the weather for next 5 days
    for (let i = 5; i < forecast.list.length; i += 8) {
      // Floor the temp to a whole number
      const temp = Math.floor(forecast.list[i].main.temp);
      const windSpeed = Math.floor(forecast.list[i].wind.speed);

      // Convert the date from the API to a week day
      let theDate = forecast.list[i].dt_txt;
      let weekday = new Date(theDate).toLocaleDateString(this.locale, {
        weekday: 'long'
      });
      let dayDate = new Date(theDate).toLocaleDateString(this.locale);

      output += `
        <div class="forecast-box">
        <img src="/src/icons/${forecast.list[i].weather[0].icon}.svg" width="100px" height="100px">
        <div class="forecast-data">
            <p id="day">${weekday}</p>
            <p id="day-date">${dayDate}</p>
            <p>Temperature: ${temp} ${this.sign}</p>
            <p>Humidity: ${forecast.list[i].main.humidity} %</p>
            <p>Wind speed: ${windSpeed} km/h</p>       
        </div>
        </div>`;
    }
    `
    </div>`;

    // Append the output to the weather container
    this.weatherData.innerHTML = output;

    // console.log(forecast);
  }

  // Display error msg
  err(msg) {
    msg
      ? (document.querySelector('.error p').textContent = msg)
      : (document.querySelector('.error p').textContent = 'Error, something went wrong');
    setTimeout(() => {
      document.querySelector('.error p').textContent = '';
    }, 3000);
  }

  // Clear the UI
  clearUI() {
    this.cityName.textContent = '';
    this.weatherData.innerHTML = '';
    this.weatherDesc.textContent = '';
    this.weatherIcon.setAttribute('src', '');
    this.weatherIcon.setAttribute('width', '');
    this.weatherIcon.setAttribute('height', '');
    this.weatherIcon.setAttribute('alt', '');
  }
}

export const ui = new UI();
