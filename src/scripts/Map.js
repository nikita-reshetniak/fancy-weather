import mapboxgl from 'mapbox-gl';
import apiConfig from './apiKeys';

export default class MapBox {
  static initiateMap(lng, lat) {
    mapboxgl.accessToken = apiConfig.mapboxKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [lng, lat], // starting position [lng, lat]
      zoom: 10, // starting zoom
    });
    this.addMarker(lng, lat, map);
  }

  static addMarker(lng, lat, to) {
    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(to);
  }
}