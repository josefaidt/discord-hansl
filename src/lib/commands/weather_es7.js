import weather from 'weather-js'
import Command from './core'
import config from '../../etc/config.json'

export default class Weather extends Command {
  constructor() {
    super()
    this.name = 'tweather'
    this.alias = 'w'
    this.help = 'provides weather information'
  }

  fn = (bot, msg, Suffix) => {
    let location = Suffix.split(' ').join('_')
    if (location.length === 0) {
      msg.channel.send('I need a location').catch(console.error)
    }

    weather.find(
      { search: location, degreeType: config.weatherDegreeType },
      async (err, res) => {
        if (err) {
          // msg.channel.send('Something went wrong while fetching the weather')
          console.log(err)
        }
        const weathermsg = await JSON.stringify(res, null, 2)
        // await console.log(JSON.stringify(res, null, 2))
        const weatherObj = await res[0]
        if (!weatherObj) {
          msg.channel.send("I can't find that location")
        } else {
          const temperature =
            weatherObj.current.temperature +
            '\xB0' +
            weatherObj.location.degreetype
          const message = `Currently in ${
            weatherObj.location.name
          } it's ${temperature}`

          msg.channel
            .send(message)
            .then(message =>
              console.log(
                `Sent weather information for ${weatherObj.location.name}`
              )
            )
            .catch(console.error)
        }
      }
    ) // end Weather.find
  }
}
