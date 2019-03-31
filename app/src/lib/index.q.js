const currentWeather = require('./currentWeather')
const forecast = require('./forecast')

module.exports = {
  currentWeather: {
    ...currentWeather,
  },
  forecast: {
    ...forecast,
  },
}
