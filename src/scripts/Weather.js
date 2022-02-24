import apiConfig from './apiKeys';

export default class Weather {
  static async getForecast(city, country, days, units, lang) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${country}&days=${days}&units=${units}&lang=${lang}&key=${apiConfig.wbKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const forecast = data.data.map((el) => {
      const weather = {
        temp: Math.round(el.temp),
        datetime: el.datetime,
        wind_spd: el.wind_spd.toFixed(1),
        wind_cdir_full: el.wind_cdir_full,
        weather: el.weather.description,
        humidity: el.rh,
        app_temp: Math.round((el.app_min_temp + el.app_max_temp) / 2),
      };
      return weather;
    });
    return forecast;
  }
}