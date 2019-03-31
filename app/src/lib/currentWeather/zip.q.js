const { request } = require('graphql-request')

const create = zip => {
  return `{
    currentWeather(zip: ${zip}) {
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
