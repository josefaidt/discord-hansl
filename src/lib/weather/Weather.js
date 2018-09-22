import Command from '../Command'

export default class Weather extends Command {
  constructor(name, alias, help, adminOnly, subcmd, location) {
    super()
    this.name = 'weather'
    this.alias = 'w'
    this.help = 'displays weather information'
    this.adminOnly = false
  }
}
