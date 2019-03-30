const weather = require('./weather')
const ping = require('./ping')

const commands = [weather, ping]

const hasCommand = input => {
  return new Promise((resolve, reject) => {
    if (typeof input === 'string') {
      // handle String values
      if (input.length === 1) {
        // handle alias input
        const x = commands.filter(c => c.aliases.includes(input))
        x.length > 0 ? resolve(x) : reject(new Error(`Unable to find command alias: ${input}`))
      } else {
        // handle name input
        const x = commands.filter(c => c.name === input)
        x.length > 0 ? resolve(x) : reject(new Error(`Unable to find command name: ${input}`))
      }
    } else {
      // handle non-string (assumed int || float)
      reject(new Error('Error: command input is a number'))
    }
  })
}

module.exports = {
  commands,
  hasCommand,
}
