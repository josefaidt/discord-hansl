class Command {
  constructor ({name, alias, help, usage, adminOnly = false, fn} = {}) {
    this.name = name
    this.alias = alias
    this.help = help
    this.usage = usage
    this.adminOnly = adminOnly
    this.fn = fn
  }
}
module.exports = Command

const commandMap = require('../commands')
module.exports.commandMap = commandMap
