const query = require('../lib/index.q').forecast
const { polishData, formatMessage } = require('./_forecast_utils')

const config = {
  name: 'forecast',
  aliases: ['f'],
  description: 'Returns weather information',
}

const format = {
  forecast: data => {
    return new Promise(resolve => {
      const {
        forecast: { cnt, list },
      } = data
      const result = 'Forecast for '
      resolve()
    })
  },
}

const handleTimeString = customTimeStr => {
  // api details in hours (int)
  const cycleChunk = 3
  const cyclesInDays = 24 / cycleChunk
  // ex: 3h, 5d, 1d, 1w
  const errors = {
    timeSpan: new Error('I need a correct time span (example: 5d for 5 days)'),
    general: new Error('I do not understand the time span provided'),
    inputTooSmall: new Error('the least I can do is 3 hours'),
  }
  return new Promise((resolve, reject) => {
    const t = customTimeStr.split('')
    if (t.length < 2) {
      reject(errors.timeSpan)
    } else if (t.length > 2) {
      reject(errors.timeSpan)
    } else if (parseInt(t[0]) && !parseInt(t[1])) {
      // ensure character in first pos is a number, but not a decimal
      // TODO: handle second position
      if (typeof t[1] === 'string') {
        switch (t[1]) {
          case 'd':
            // TODO: handle days
            resolve(t[0] * cyclesInDays)
            break
          case 'h':
            // TODO: handle hours
            if (t[0] % 3 === 0) {
              resolve(t[0])
            } else {
              const s = Math.floor(t[0] / 3)
              resolve(s)
            }
            break
          case 'm':
            // TODO error: handle minutes
            reject(errors.inputTooSmall)
            break
          case 's':
            // TODO error: handle seconds
            reject(errors.inputTooSmall)
            break
          default:
            reject(errors.general)
            break
        }
      } else {
        // TODO: better error handling for second position cases
        reject(errors.general)
      }
    } else if (parseInt(t[0]) && parseInt(t[1])) {
      // TODO error: number in second position as well
      reject(errors.timeSpan)
    } else {
      reject(errors.general)
    }
  })
}

const handleCommand = Suffix => {
  return new Promise((resolve, reject) => {
    const location = Suffix.split(' ')[0]
    const timeSpan = Suffix.toLowerCase()
      .split(' ')
      .slice(1, this.length)[0]
    console.log('LOCATION', location)
    console.log('TIME SPAN', timeSpan)
    if (Suffix.length === 0) {
      // check for invalid location
      reject(new Error('I need a location'))
      // msg.channel.send('I need a location.').catch(console.error)
    } else {
      // if valid location is provided without subcommand
      if (location.length === 5 && parseInt(location)) {
        // check if location is a ZIP code
        const zip = location

        // TODO: proper error handling
        resolve(
          handleTimeString(timeSpan)
            .then(t => query.zip({ zip: zip, limit: t }))
            .then(polishData)
            .then(formatMessage)
        )

        // resolve(query.zip(zip).then(format.currentWeather))
      } else if (
        // check for State provided
        typeof location === 'string' &&
        !parseInt(location) &&
        !parseFloat(location)
      ) {
        const city = location
        console.log('made it')

        console.log('---------------------')
        console.log('WEATHER INFO:')
        console.log(`CITY: ${city || ''}`)
        console.log('---------------------')

        resolve(query.city(city).then(format.currentWeather))
      }
    }
  })
}

module.exports = {
  ...config,
  handleCommand,
}
