const { get } = require('http')
const weather = require('weather-js')
const { Attachment } = require('discord.js')
const Library = require('../Library')

class Weather extends Library {
  constructor() {
    super()
    this.getWeather = queryUrl => {
      return new Promise((resolve, reject) => {
        get(queryUrl, res => {
          let data = ''
          res.on('data', chunk => {
            data += chunk
          })
          res.on('end', () => {
            console.log('geolookup', JSON.parse(data))
            resolve(JSON.parse(data))
          })
        }).on('error', err => {
          reject(err)
        })
      })
    }
    // this.messageCurrentWeather = this.messageCurrentWeather.bind(this)
    // this.shapeData = this.shapeData.bind(this)
  }

  async get(location, callback) {
    let message
    weather.find(
      { search: location, degreeType: process.env.WEATHER_DEGREE_TYPE },
      async (err, res) => {
        if (err) {
          // msg.channel.send('Something went wrong while fetching the weather')
          console.log(err)
        }
        // const weathermsg = await JSON.stringify(res, null, 2)
        const weatherData = await res[0]
        if (!weatherData) {
          return callback("I can't find that location")
        } else {
          message = this.general(weatherData)
          const img = new Attachment(weatherData.current.imageUrl)
          // console.log(weatherData)
          return callback(message, img)
        }
      }
    )
  }

  general(weatherData) {
    const temperature = weatherData.current.temperature + '\xB0' + weatherData.location.degreetype
    return `Currently in ${weatherData.location.name} it's ${temperature}`
  }

  image(url) {
    const image = new Attachment(url)
    return image
  }

  newGet(location) {
    return new Promise((resolve, reject) => {
      get(
        `http://api.wunderground.com/api/${
          process.env.WEATHER_API_KEY
        }/geolookup/conditions/q/${location}.json`,
        resp => {
          let data = ''

          // A chunk of data has been recieved.
          resp.on('data', chunk => {
            data += chunk
          })

          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            console.log(JSON.parse(data))
            resolve(JSON.parse(data))
          })
        }
      ).on('error', err => {
        console.log('Error: ' + err.message)
      })
    })
  }

  geoLookup = ({ city, state, country, zip }) => {
    let queryUrl = `http://api.wunderground.com/api/${
      process.env.WEATHER_API_KEY
    }/forecast/geolookup/conditions/q/`
    if (zip) {
      queryUrl += `${zip}.json`
    } else if (city && state) {
      queryUrl += `${state}/${city}.json`
    } else if (city && country) {
      queryUrl += `${country}/${city}.json`
    }
    return this.getWeather(queryUrl)
  }

  shapeData = data => {
    // console.log('shapeData', data)
    const { city, state } = data.location
    const { feelslike_f } = data.current_observation
    const message = `Currently in ${city}, ${state} it feels like ${feelslike_f}\xB0${
      process.env.WEATHER_DEGREE_TYPE
    }`
    return new Promise(resolve => {
      resolve(message)
    })
  }

  messageCurrentWeather = (location, currentWeather) => {
    const { city, state } = location
    const { feelslike_f } = currentWeather
    return `Currently in ${city}, ${state} it feels like ${feelslike_f}\xB0`
  }
}

module.exports = new Weather()
