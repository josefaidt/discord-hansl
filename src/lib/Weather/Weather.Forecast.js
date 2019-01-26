import Command from '../Command'
import Library from '../Library'
import { RichEmbed } from 'discord.js'

export default class Forecast extends Library {
  constructor() {
    super()
    this.name = 'forecast'
    this.alias = 'f'
  }

  getSimpleForecast = forecastData => {
    return new Promise((resolve, reject) => {
      const message = new RichEmbed(forecastData.simpleforecast.forecastday[0].icon_url)
      resolve(message)
    })
  }
}
