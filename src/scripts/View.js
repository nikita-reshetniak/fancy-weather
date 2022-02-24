import '../styles/dashboard.css';
import '../styles/weather.css';
import '../styles/map.css';
import Time from './Time';

export default class View {
  static getChangeImgBtn() {
    return this.createElement('button', ['btn', 'change-img-btn']);
  }

  static getChangeLangBtn() {
    const langBtn = this.createElement('button', ['btn', 'change-lang-btn']);
    langBtn.appendChild(document.createTextNode('EN'));
    return langBtn;
  }

  static getChangeUnitsBtn() {
    const toggleBtn = this.createElement('div', 'change-units-btn');

    const fBtn = this.createElement('button', ['btn', 'f-btn', 'inactive']);
    fBtn.appendChild(document.createTextNode('°F'));
    fBtn.dataset.units = 'I';
    toggleBtn.appendChild(fBtn);

    const cBtn = this.createElement('button', ['btn', 'c-btn']);
    cBtn.appendChild(document.createTextNode('°C'));
    cBtn.dataset.units = 'M';
    toggleBtn.appendChild(cBtn);

    return toggleBtn;
  }

  static renderWeatherCluster(location, time, forecast, units) {
    const weatherCluster = this.createElement('div', 'weather-cluster');

    const userLocation = this.createElement('div', 'user-location');
    userLocation.appendChild(document.createTextNode(`${location.city}, ${location.country}`));

    const userTime = this.createElement('div', 'user-time');
    userTime.appendChild(document.createTextNode(`${time}`));

    const currTemp = this.createElement('div', 'current-temp');
    currTemp.appendChild(document.createTextNode(`${forecast[0].temp}°`));
    weatherCluster.appendChild(userLocation);
    weatherCluster.appendChild(userTime);
    weatherCluster.appendChild(currTemp);

    const currParams = this.createWeatherParams(forecast, units);
    weatherCluster.appendChild(currParams);

    const forecastCluster = this.createForecast(forecast);
    weatherCluster.appendChild(forecastCluster);

    this.getElement('main').appendChild(weatherCluster);
  }

  static createWeatherParams(forecast, units) {
    const params = this.createElement('div', 'current-params');

    const description = this.createElement('div');
    description.appendChild(document.createTextNode(forecast[0].weather));

    const feelsLike = this.createElement('div');
    feelsLike.appendChild(document.createTextNode(`feels like: ${forecast[0].app_temp}°`));

    const wind = this.createElement('div');
    wind.appendChild(document.createTextNode(`wind: ${forecast[0].wind_spd} ${(units === 'M') ? 'm/s' : 'mph'}`));

    const humidity = this.createElement('div');
    humidity.appendChild(document.createTextNode(`humidity: ${forecast[0].humidity}%`));

    params.appendChild(description);
    params.appendChild(feelsLike);
    params.appendChild(wind);
    params.appendChild(humidity);

    return params;
  }

  static createForecast(forecast) {
    const forecastCluster = this.createElement('div', 'forecast');

    forecast.forEach((el, index) => {
      if (index > 0) {
        const day = this.createElement('div', 'forecast-day');

        const weekDay = this.createElement('div', 'week-day');
        weekDay.appendChild(document.createTextNode(Time.getWeekDay(el.datetime, 'en')));
        day.appendChild(weekDay);

        const temp = this.createElement('div', 'temp');
        temp.appendChild(document.createTextNode(`${el.temp}°`));
        day.appendChild(temp);

        forecastCluster.appendChild(day);
      }
    });

    return forecastCluster;
  }

  static renderMapCluster(lng, lat) {
    const mapCluster = this.createElement('div', 'map-cluster');
    const map = this.createElement('div', null, 'map');
    mapCluster.appendChild(map);

    const latitude = this.createElement('div', 'map-cluster-latitude');
    latitude.appendChild(document.createTextNode(`Latitude: ${lat}`));
    mapCluster.appendChild(latitude);

    const longitude = this.createElement('div', 'map-cluster-longitude');
    longitude.appendChild(document.createTextNode(`Longitude: ${lng}`));
    mapCluster.appendChild(longitude);

    this.getElement('main').appendChild(mapCluster);
  }

  static setBgImage(img) {
    document.body.style.background = `linear-gradient(
      rgba(0, 0, 0, 0.5), 
      rgba(0, 0, 0, 0.5)
    ) no-repeat center center fixed ,url(${img}) no-repeat center center fixed`;
    document.body.style.backgroundSize = 'cover';
  }

  static createElement(tag, className, id) {
    const el = document.createElement(tag);
    if (className) {
      if (Array.isArray(className)) {
        className.forEach((classEl) => el.classList.add(classEl));
      } else {
        el.classList.add(className);
      }
    }
    if (id) {
      el.setAttribute('id', id);
    }
    return el;
  }

  static getElement(selector, parent) {
    const el = (parent) ? parent.querySelector(selector)
      : document.querySelector(selector);

    return el;
  }
}