const { request } = require('graphql-request')

const create = ({ city, limit }) => {
  return `{
    forecast(city: "${city}", limit: ${limit}) {
      cnt
      list {
        dt
        dt_txt
        main {
          temp
          temp_min
          temp_max 
        }
        weather {
          main
          description
          icon
        }
      }
    }
  }`
}

const get = input => {
  const url = process.env.WEATHER_URL
  return request(url, create(input))
}

module.exports = get
