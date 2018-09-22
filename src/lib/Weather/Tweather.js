import weather from 'weather-js'
import Command from '../Command'

const config = process.env

export default new Command(
  'tweather',
  't',
  'provides weather information',
  function(bot, msg, Suffix) {
    Weather.find(
      { search: location, degreeType: config.WEATHER_DEGREE_TYPE },
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
)

// module.exports.cmdWeather = cmdWeather
