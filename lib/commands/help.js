'use strict'

// require Command class from app core
const Command = require('./core')

function stringifyCommand (cmd) {
  const message = `${cmd.name}: ${cmd.help}`
  // add cmd.usage commands
  return message
}

const cmdHelp = new Command()
cmdHelp.name = 'help'
cmdHelp.help = 'Shows list of commands and their usage'
cmdHelp.fn = (bot, msg, Suffix) => {
  try {
    const map = Command.commandMap
    const vals = map.values()

    let cmdString = "```"
    cmdString += "# hansl's command help\n"
    cmdString += "Below is a list of commands and their intended use:\n\n"

    for (let i = 0; i < map.size; i++) {
      let str = stringifyCommand(vals.next().value)
      cmdString += '- ' + str + '\n'
    }
    cmdString += "```"
    // console.log(cmdString)
    msg.channel.send(cmdString)
  } catch (e) {
    console.error(`ISSUE: loading helpfile, commands; ${e.message}`)
    msg.channel.send("Looks like I'm experiencing an issue loading the commnds")
  } 
}
module.exports.cmdHelp = cmdHelp