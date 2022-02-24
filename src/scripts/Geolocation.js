import apiConfig from './apiKeys';

export default class Geolocation {
  static async getUserLocation() {
    const coords = await this.getCoords();
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${coords.latitude}+${coords.longitude}&key=${apiConfig.ocdKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const result = data.results[0];
    const location = {
      lat: coords.latitude,
      lng: coords.longitude,
      city: result.components.city,
      country: result.components.country,
      country_code: result.components.country_code,
    };
    return location;
  }

  static async getCoords() {
    const promise = new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {enableHighAccuracy: true});
    });
    const position = await promise;
    return position.coords;
  }
}