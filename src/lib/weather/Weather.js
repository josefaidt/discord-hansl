import Command from '../Command'

export default class Weather extends Command {
  constructor(subcmd, location) {
    this.name = 'weather'
    this.alias = 'w'
    this.help = 'displays weather information'
    this.adminOnly = false
  }
}
