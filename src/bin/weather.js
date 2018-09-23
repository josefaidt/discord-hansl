import { Weather as weather } from '../lib'
import Weather from 'weather-js'

let general = new weather.general.default()

let wait = async (fn, callback) => {
  await fn,
    () => {
      return callback
    }
}

export default {
  default: (bot, msg, Suffix) => {
    const location = Suffix.split(' ').join('_')
    const suffix = Suffix.split(' ')
    if (location.length === 0) {
      msg.channel.send('I need a location').catch(console.error)
    } else if (suffix.length > 1) {
      let subcmd = suffix[0]
      let location = suffix[1]
    } else {
      // wait(general.default(location), message => {
      //   msg.channel.send(message)
      // })
      Weather.find(
        { search: location, degreeType: process.env.WEATHER_DEGREE_TYPE },
        async (err, res) => {
          if (err) {
            // msg.channel.send('Something went wrong while fetching the weather')
            console.log(err)
          }
          const weathermsg = await JSON.stringify(res, null, 2)
          // await console.log(JSON.stringify(res, null, 2))
          const weather = await res[0]
          if (!weather) {
            msg.channel.send("I can't find that location")
          } else {
            const temperature =
              weather.current.temperature + '\xB0' + weather.location.degreetype
            const message = `Currently in ${
              weather.location.name
            } it's ${temperature}`
            msg.channel
              .send(message)
              .then(message =>
                console.log(
                  `Sent weather information for ${weather.location.name}`
                )
              )
              .catch(console.error)
          }
        }
      )
    }
  }
}
