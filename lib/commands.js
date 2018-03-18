'use strict'

const dir = require('require-directory')
const commands = dir(module, './commands')

// require Command class from app core
const Command = commands.core
// create Commands map
const CommandMap = new Map()

function printError(msg, error) {
  const message = "Oops, I've encountered an error"
  return msg.channel.send(error.message)
}

const cmdTest = new Command()
cmdTest.name = 'test'
cmdTest.help = 'sends back test response'
cmdTest.fn = function (msg) {
    // Send a message
  msg.channel.send('hello!')
      .then(message => console.log(`Sent test message`))
      .catch(console.error)
}
CommandMap.set('test', cmdTest)

CommandMap.set('weather', commands.weather.cmdWeather)
// console.log(CommandMap)
// console.log(commands)

module.exports = CommandMap