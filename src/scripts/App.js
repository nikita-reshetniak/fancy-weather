import '../styles/App.css';

export default class App {
  constructor(obj) {
    this.view = obj.view;
    this.geolocation = obj.geolocation;
    this.weather = obj.weather;
    this.dashboard = obj.dashboard;
    this.map = obj.map;
    this.time = obj.time;
    this.lang = 'en';
    this.units = 'M';
  }

  async init() {
    this.location = await this.geolocation.getUserLocation();
    this.changeImg();
    this.renderDashboard();
    this.renderMain();
  }

  renderDashboard() {
    const headerCluster = this.view.createElement('header');

    const changeImgBtn = this.view.getChangeImgBtn();
    changeImgBtn.addEventListener('click', this.changeImg.bind(this));
    headerCluster.appendChild(changeImgBtn);

    const changeLangBtn = this.view.getChangeLangBtn();
    changeLangBtn.addEventListener('click', this.changeLangHandler.bind(this));
    headerCluster.appendChild(changeLangBtn);

    const changeUnitsBtn = this.view.getChangeUnitsBtn();
    changeUnitsBtn.addEventListener('click', this.changeUnitsHandler.bind(this));
    headerCluster.appendChild(changeUnitsBtn);

    document.body.appendChild(headerCluster);
  }

  async changeImg() {
    const bg = await this.dashboard.getBgImg(this.location.country);
    this.view.setBgImage(bg);
  }

  async changeLangHandler() {
    this.lang = (this.lang === 'en') ? 'pl' : 'en';
  }

  async changeUnitsHandler(e) {
    if (this.units !== e.target.dataset.units) {
      const { target } = e;
      this.units = target.dataset.units;
      const parent = target.parentNode;
      const buttons = parent.childNodes;
      buttons[0].classList.toggle('inactive');
      buttons[1].classList.toggle('inactive');
      this.view.getElement('main').remove();
      this.renderMain();
    }
  }

  async renderMain() {
    this.forecast = await this.weather.getForecast(this.location.city,
      this.location.country_code,
      4,
      this.units,
      this.lang);
    document.body.appendChild(this.view.createElement('main'));

    this.view.renderWeatherCluster(this.location, this.time.getDate(), this.forecast);

    this.view.renderMapCluster(this.location.lng, this.location.lat);
    this.map.initiateMap(this.location.lng, this.location.lat);
  }
}