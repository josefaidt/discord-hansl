'use strict'

const dir = require('require-directory')
const commands = dir(module, './commands')

class Command {
  constructor ({name, help, usage, adminOnly = false, fn} = {}) {
    this.name = name
    this.help = help
    this.usage = usage
    this.adminOnly = adminOnly
    this.fn = fn
  }
}

const Commands = new Map()

const cmdTest = new Command()
cmdTest.name = 'test'
cmdTest.help = 'sends back test response'
cmdTest.fn = function (msg) {
    // Send a message
  msg.channel.send('hello!')
      .then(message => console.log(`Sent test message`))
      .catch(console.error)
}
Commands.set('test', cmdTest)

const cmdWeather = new Command()
cmdWeather.name = 'weather'
cmdWeather.help = 'provides weather information'
cmdWeather.fn = function (msg, suffix) {
  const weather = require('./commands/weather')
  const location = suffix
  return weather.get(location)
}
Commands.set('weather', cmdWeather)

console.log(Commands)

module.exports = Commands

// module.exports = {
//   gdax: {
//     name: 'gdax',
//     help: 'Lists generic currency information about GDAX market exchange',
//     usage: '$gdax <coin ticker> <price/stat>',
//     adminOnly: false,
//     fn: (msg, Suffix) => {
//       const gdax = require('./gdax')
//       exports.gdax = gdax
//       const suffix = Suffix.split(' ')
//       const cmd = suffix[0]
//       const coin = suffix[1]

//       switch (cmd) {
//         case 'price':
//           let message = gdax.currentPrice(coin)
//           console.log(gdax.currentPrice(coin))
//           console.log(`cmd: ${cmd}, coin: ${coin}, message: ${message}`)
//           msg.channel.send(message)
//             .then(message => console.log(`Sent message: ${message.content}`))
//             .catch(console.error)
//           break
//         default:
//           msg.channel.send(`need additional commands`)
//           break
//       }
//     }
//   },
//   test: cmdTest,
//   weather: cmdWeather
// }
