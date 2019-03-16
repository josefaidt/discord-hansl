const { get } = require('http')
const weather = require('weather-js')
const ENV = require('../.config/env.dev')

const config = {
  name: 'weather',
  aliases: ['w'],
  description: 'Returns weather information',
}

const fetchWeather = queryUrl => {
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

const gettit = async (location, callback) => {
  let message
  weather.find(
    { search: location, degreeType: ENV.WEATHER.WEATHER_DEGREE_TYPE },
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

const general = weatherData => {
  const temperature = `${weatherData.current.temperature}\xB0${weatherData.location.degreetype}`
  return `Currently in ${weatherData.location.name} it's ${temperature}`
}

const image = url => {
  const image = new Attachment(url)
  return image
}

const newGet = location => {
  return new Promise((resolve, reject) => {
    get(
      `api.openweathermap.org/data/2.5/weather?q=${
        ENV.WEATHER.WEATHER_API_KEY
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
      console.log(`Error: ${err.message}`)
    })
  })
}

const geoLookup = ({ city, state, country, zip }) => {
  let query = ''
  if (zip) {
    query = `${zip}.json`
  } else if (city && state) {
    query = `${state}/${city}.json`
  } else if (city && country) {
    query = `${country}/${city}.json`
  }
  const queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${
    ENV.WEATHER.API_KEY
  }`
  return fetchWeather(queryUrl)
}

const shapeData = data => {
  // console.log('shapeData', data)
  const { city, state } = data.location
  const { feelslike_f } = data.current_observation
  const message = `Currently in ${city}, ${state} it feels like ${feelslike_f}\xB0${
    ENV.WEATHER.WEATHER_DEGREE_TYPE
  }`
  return new Promise(resolve => {
    resolve(message)
  })
}

const messageCurrentWeather = (location, currentWeather) => {
  const { city, state } = location
  const { feelslike_f } = currentWeather
  return `Currently in ${city}, ${state} it feels like ${feelslike_f}\xB0`
}

const handleCommand = async (bot, msg, Suffix) => {
  const location = Suffix.split(' ').join('_')
  const suffix = Suffix.toUpperCase().split(' ')
  if (Suffix.length === 0) {
    // check for invalid location
    msg.channel.send('I need a location.').catch(console.error)
  } else {
    // if valid location is provided without subcommand
    if (location.length === 5 && parseInt(location)) {
      // check if location is a ZIP code
      const zip = location
      await geoLookup({ zip })
        .then(shapeData)
        .then(message => {
          msg.channel.send(message).catch(console.error)
        })
        .catch(console.error)
    } else if (
      // check for State provided
      suffix[1].length === 2 ||
      suffix[2].length === 2 ||
      Suffix.split(',').length === 2 ||
      Suffix.split(',').length === 3
    ) {
      console.log(Suffix)
      const location = Suffix.toUpperCase()
      let state = ''
      let city = ''
      if (location.split(',').length === 2) {
        const locationArray = location.split(',')
        state = locationArray[1]
        city = locationArray[0]
      } else if (suffix[1].length === 2) {
        state = suffix[1]
        city = suffix[0]
      } else if (suffix[2].length === 2) {
        state = suffix[2].console.log(suffix.slice(0, 2))
        city = suffix.slice(0, 2).join(' ')
      }

      await geoLookup({ city, state })
        .then(shapeData)
        .then(message => {
          msg.channel.send(message).catch(console.error)
        })
        .catch(console.error)
    }
  }
}

module.exports = {
  ...config,
  handleCommand,
}
