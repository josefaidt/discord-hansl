import Weather from '../lib/Weather/Weather'
// import Weather from 'weather-js'

const weather = new Weather()
const { shapeData, messageCurrentWeather } = weather

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
        await weather
          .geoLookup({ zip })
          .then(shapeData)
          .then(message => {
            msg.channel.send(message)
          })
          .catch(console.error)
        await weather.get(location, async (message, img) => {
          await msg.channel.send(message, img)
        })
      }
      // await general.newGet(location)
    }
  }
}
