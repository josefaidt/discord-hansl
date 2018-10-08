import Command from '../Command'
import weather from 'weather-js'
import { Attachment } from 'discord.js'
import { get } from 'http'

export default class Weather extends Command {
  constructor (name, alias, help, adminOnly) {
    super()
    this.name = 'weather'
    this.alias = 'w'
    this.help = 'displays weather information'
    this.adminOnly = false
  }

  async get (location, callback) {
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
          let img = new Attachment(weatherData.current.imageUrl)
          // console.log(weatherData)
          return callback(message, img)
        }
      }
    )
  }

  general (weatherData) {
    const temperature = weatherData.current.temperature + '\xB0' + weatherData.location.degreetype
    return `Currently in ${ weatherData.location.name } it's ${ temperature }`
  }

  image (url) {
    const image = new Attachment(url)
    return image
  }

  newGet (location) {
    return new Promise((resolve, reject) => {
      get(`http://api.wunderground.com/api/${ process.env.WEATHER_API_KEY }/geolookup/conditions/q/${ location }.json`, resp => {
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
      }).on('error', err => {
        console.log('Error: ' + err.message)
      })
    })
  }

  geoLookup ({ city, state, country, zip }) {
    if (zip) {
      return new Promise((resolve, reject) => {
        get(`http://api.wunderground.com/api/${ process.env.WEATHER_API_KEY }/forecast/geolookup/conditions/q/${ zip }.json`, res => {
          let data = ''

          res.on('data', chunk => {
            data += chunk
          })

          res.on('end', () => {
            console.log(JSON.parse(data))
            resolve(JSON.parse(data))
          })
        }).on('error', err => {
          reject(err)
        })
      })
    }
  }

  shapeData (data) {
    return new Promise(resolve => {
      resolve(this.messageCurrentWeather(data.location, data.current_observation))
    })
  }

  messageCurrentWeather (location, currentWeather) {
    let { city, state } = location
    let { feelslike_f } = currentWeather
    return `Currently in ${ city }, ${ state } it feels like ${ feelslike_f }`
  }
}
