'use strict'

const dir = require('require-directory')
const commandModules = dir(module, './commands')

// create Commands map
const CommandMap = new Map()

function printError(msg, error) {
  const message = "Oops, I've encountered an error"
  return msg.channel.send(error.message)
}

// console.log(commandModules)

// 
// Dynamic Command loader
// 
// iterate over commandModules object
for (let i in commandModules) {
  // iterate over keys for objects
  Object.keys(commandModules[i]).forEach(
    (x) => {
      // if key Command Object value name begins with 'cmd'
      if (x.substring(0,3) === 'cmd') {
        console.log('we got a cmd!: ' + x)
        // store cmd name
        const cName = commandModules[i][x].name
        // store cmd object
        const cObj = commandModules[i][x]
        // set commandMap with cmd name then with cmd function
        CommandMap.set(cName, cObj)
      }
    }
  )
}

console.log(CommandMap)

module.exports = CommandMap