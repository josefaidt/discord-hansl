import Location from './Weather.Location'
export default class Forecast extends Location {
  constructor({ zip, city, state, country }) {
    super()
    this.location = new Location({ zip, city, state, country })
  }
  getForecast = weatherData => {
    return new Promise((resolve, reject) => {})
  }
}
