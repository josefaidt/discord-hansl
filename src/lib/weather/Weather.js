import Command from '../Command'
import weather from 'weather-js'
import { Attachment } from 'discord.js'

export default class Weather extends Command {
  constructor (name, alias, help, adminOnly) {
    super()
    this.name = 'weather'
    this.alias = 'w'
    this.help = 'displays weather information'
    this.adminOnly = false
  }

  async get (location, callback) {
    let message
    weather.find(
      { search: location, degreeType: process.env.WEATHER_DEGREE_TYPE },
      async (err, res) => {
        if (err) {
          // msg.channel.send('Something went wrong while fetching the weather')
          console.log(err)
        }
        // const weathermsg = await JSON.stringify(res, null, 2)
        const weatherData = await res[0]
        if (!weatherData) {
          return "I can't find that location"
        } else {
          message = this.general(weatherData)
          let img = new Attachment(weatherData.current.imageUrl)
          console.log(weatherData)
          return await callback(message, img)
        }
      }
    )
  }

  general (weatherData) {
    const temperature = weatherData.current.temperature + '\xB0' + weatherData.location.degreetype
    return `Currently in ${ weatherData.location.name } it's ${ temperature }`
  }

  image (url) {
    const image = new Attachment(url)
    return image
  }
}
