import Command from '../lib/Command'
import weather from '../lib/Weather'
import { parse } from 'querystring'

// const weather = new WeatherLib()
const { shapeData, messageCurrentWeather } = weather
console.log('weatherlib', weather)

// console.log(Object.getOwnPropertyNames())
// console.log(weather)

function isSubCommand(libModule, subcommand) {
  return new Promise((resolve, reject) => {
    libModule.subCommands.forEach(i => {
      // console.log(i.name.toUpperCase())
      if (i.name.toUpperCase() === subcommand) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
  // if (libModule.subcommands.hasOwnProperty(subcommand)) {
  //   return true
  // } else {
  //   return false
  // }
}

export default class Weather extends Command {
  constructor() {
    super()
    this.name = 'weather'
    this.alias = 'w'
    this.help = 'displays weather information'
    this.adminOnly = false
  }

  destructureLocation = string => {
    const location = string.split(' ').join('_')
    if (location.length === 5 && parseInt(location)) {
      const zip = location
    }
  }

  default = async (bot, msg, Suffix) => {
    const location = Suffix.split(' ').join('_')
    const suffix = Suffix.toUpperCase().split(' ')
    // console.log('************SUFFIX[0]************', suffix[0])
    console.log(isSubCommand(weather, suffix[0]))
    let subCommand = ''
    // console.log(weather.subcommands)
    if (Suffix.length === 0) {
      // check for invalid location
      msg.channel.send('I need a location.').catch(console.error)
    } else if (isSubCommand(weather, suffix[0])) {
      subCommand = suffix[0]
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
        const location = Suffix.toUpperCase()
        let state = ''
        let city = ''
        if (location.split(',').length === 2) {
          const locationArray = location.split(',')
          state = locationArray[1]
          city = locationArray[0]
        } else if (suffix[1].legnth === 2) {
          state = suffix[1]
          city = suffix[0]
        } else if (suffix[2].length === 2) {
          state = suffix[2].console.log(suffix.slice(0, 2))
          city = suffix.slice(0, 2).join(' ')
        }
        // const { city, state } = weather.getCityState(Suffix, suffix)
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
}
