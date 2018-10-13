import { Weather as weather } from '../lib'
// import Weather from 'weather-js'

const Weather = new weather.general.default()
const { shapeData, messageCurrentWeather } = Weather

// let wait = async (fn, callback) => {
//   await fn,
//   () => {
//     return callback
//   }
// }

export default {
  default: async (bot, msg, Suffix) => {
    const location = Suffix.split(' ').join('_')
    const suffix = Suffix.split(' ')
    if (location.length === 0) {
      msg.channel.send('I need a location').catch(console.error)
    } else if (suffix.length > 1) {
      const subcmd = suffix[0]
      const location = suffix[1]
    } else {
      if (location.length === 5 && parseInt(location)) {
        const zip = location
        await Weather.geoLookup({ zip })
          .then(shapeData)
          .then(msg.channel.send)
          .catch(console.error)
        await Weather.get(location, async (message, img) => {
          await msg.channel.send(message, img)
        })
      }
      // await general.newGet(location)
    }
  }
}
