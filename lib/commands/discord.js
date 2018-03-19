'use strict'

// require Command class from app core
const Command = require('./core')

const cmds = []

const cmdMyAvatar = new Command()
cmdMyAvatar.name = 'avatar'
cmdMyAvatar.help = 'Sends back your avatar picture'
cmdMyAvatar.fn = function (bot, msg, Suffix) {
  msg.reply(msg.author.avatarURL)
}
module.exports.cmdMyAvatar = cmdMyAvatar

const cmdTest = new Command()
cmdTest.name = 'test'
cmdTest.help = 'sends back test response'
cmdTest.fn = function (bot, msg) {
    // Send a message
  msg.channel.send('hello!')
      .then(message => console.log(`Sent test message`))
      .catch(console.error)
}
module.exports.cmdTest = cmdTest

// cmds.push(cmdMyAvatar)
// module.exports = cmds