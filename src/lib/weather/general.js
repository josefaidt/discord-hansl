const weather = require('weather-js')
const Weather = require('./Weather')
const Command = require('../Command')

class General extends Weather {
  constructor(name, alias, help, adminOnly, subcmd, location, Suffix) {
    super()
    this.name = 'weather'
    this.alias = 'w'
    this.help = 'displays weather information'
    this.adminOnly = false
  }

  default(location) {
    weather.find(
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
          // msg.channel.send("I can't find that location")
          return "I can't find that location"
        } else {
          const temperature = weather.current.temperature + '\xB0' + weather.location.degreetype
          const message = `Currently in ${weather.location.name} it's ${temperature}`
          return message
          // msg.channel
          //   .send(message)
          //   .then(message =>
          //     console.log(
          //       `Sent weather information for ${weather.location.name}`
          //     )
          //   )
          //   .catch(console.error)
        }
      }
    )
  }
}

const cmdWeather = new Command({
  name: 'weather',
  alias: 'w',
  help: 'provides weather information',
  fn: (bot, msg, Suffix) => {
    const location = Suffix.split(' ').join('_')
    if (location.length === 0) {
      msg.channel.send('I need a location').catch(console.error)
    }
  }
})

module.exports = cmdWeather
