'use strict'

// require Command class from app core
const Command = require('./core')

const cmdTest = new Command()
cmdTest.name = 'test'
cmdTest.help = 'sends back test response'
cmdTest.fn = (bot, msg) => {
    // Send a message
  msg.reply('hello!')
      .then(message => console.log(`Sent test message`))
      .catch(console.error)
}
module.exports.cmdTest = cmdTest

const cmdMyAvatar = new Command()
cmdMyAvatar.name = 'avatar'
cmdMyAvatar.help = 'Sends back your avatar picture'
cmdMyAvatar.fn = (bot, msg, Suffix) => {
  if (!Suffix) {
    msg.reply(msg.author.avatarURL)
  }
}
module.exports.cmdMyAvatar = cmdMyAvatar

// cmds.push(cmdMyAvatar)
// module.exports = cmds

const cmdRole = new Command()
cmdRole.name = 'role'
cmdRole.help = 'Role manager'
cmdRole.fn = (bot, msg, Suffix) => {
  if (!Suffix) {
    msg.reply('what do you want to do with roles?')
  } else {
    const suffix = Suffix.split(' ')
    switch (suffix[0]) {
      case 'create':
        if (!suffix[1]) {
          msg.channel.send("I'll need a name")
        } else {
          const roleName = suffix[1]
          msg.channel.send(`role name is: ${roleName}`)
        }
        break
      default:
        msg.reply("I don't understand")
    }
  }
}
module.exports.cmdRole = cmdRole