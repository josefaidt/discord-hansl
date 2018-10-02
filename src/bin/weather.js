import { Weather as weather } from '../lib'
import Weather from 'weather-js'

let general = new weather.general.default()

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
      let subcmd = suffix[0]
      let location = suffix[1]
    } else {
      await general.get(location, async (message, img) => {
        await msg.channel.send(message, img)
      })
    }
  }
}
