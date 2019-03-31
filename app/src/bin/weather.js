const query = require('../lib/index.q').currentWeather

const config = {
  name: 'weather',
  aliases: ['w'],
  description: 'Returns weather information',
}

const format = {
  currentWeather: data => {
    return new Promise(resolve => {
      const {
        currentWeather: {
          name,
          main: { temp },
          weather: { main, description },
        },
      } = data
      resolve(`Currently in ${name} it is ${temp}°F`)
    })
  },
}

const handleCommand = Suffix => {
  return new Promise((resolve, reject) => {
    const location = Suffix
    const suffix = Suffix.toUpperCase().split(' ')
    console.log('LOCATION', location)
    if (Suffix.length === 0) {
      // check for invalid location
      reject(new Error('I need a location'))
      // msg.channel.send('I need a location.').catch(console.error)
    } else {
      // if valid location is provided without subcommand
      if (location.length === 5 && parseInt(location)) {
        // check if location is a ZIP code
        const zip = location
        resolve(query.zip(zip).then(format.currentWeather))
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
