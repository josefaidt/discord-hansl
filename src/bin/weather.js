const { get } = require('http')
const weather = require('weather-js')

const config = {
  name: 'weather',
  aliases: ['w'],
  description: 'Returns weather information',
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
      await weather
        .geoLookup({ zip })
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

      await weather
        .geoLookup({ city, state })
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
