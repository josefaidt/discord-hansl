const { request } = require('graphql-request')

const create = city => {
  return `{
    currentWeather(city: "${city}") {
      name
      weather {
        main
        description
      }
      main {
        temp
      }
    }
  }`
}

const get = input => {
  const url = process.env.WEATHER_URL
  return request(url, create(input))
}

module.exports = get
