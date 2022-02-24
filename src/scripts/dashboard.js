import apiConfig from './apiKeys';

export default class Dashboard {
  static async getBgImg(country) {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${country}&client_id=${apiConfig.unsplashKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const img = data.urls.regular;
    return img;
  }
}