import App from './App';
import View from './View';
import Weather from './Weather';
import Geolocation from './Geolocation';
import Dashboard from './Dashboard';
import MapBox from './Map';
import Time from './Time';

const app = new App({view: View,
  geolocation: Geolocation,
  weather: Weather,
  dashboard: Dashboard,
  map: MapBox,
  time: Time});

app.init();