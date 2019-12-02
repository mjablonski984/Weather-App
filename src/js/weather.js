class Weather {
  constructor() {
    this.key = '3a14e64a1c90b481aa30e7873950f167';
    this.units = 'metric';
  }

  // Get current weather (input field)
  async getCurrent(city) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${this.units}&APPID=${this.key}`
    );

    const data = await response.json();

    return data;
  }

  // Get forcast (input field)
  async getForecast(city) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${this.units}&APPID=${this.key}`
    );

    const data = await response.json();

    return data;
  }

  // Get current weather (geolocation)
  async getCurrentCoords(coords) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=${this.units}&APPID=${this.key}`
    );

    const data = await response.json();

    return data;
  }

  // Get forecast (geolocation)
  async getForecastCoords(coords) {
    const forecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&units=${this.units}&APPID=${this.key}`
    );

    const data = await forecast.json();

    return data;
  }
}

export const weather = new Weather();
