import Command from '../Command'

export default class Weather extends Command {
  constructor(name, alias, help, adminOnly) {
    super()
    this.name = 'weather'
    this.alias = 'w'
    this.help = 'displays weather information'
    this.adminOnly = false
  }
}
