'use strict'

// require Command class from app core
const Command = require('./core')

//
// COMMAND: TEST
// 
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


//
// COMMAND: MY AVATAR
// 
const cmdMyAvatar = new Command()
cmdMyAvatar.name = 'avatar'
cmdMyAvatar.help = 'Sends back your avatar picture'
cmdMyAvatar.fn = (bot, msg, Suffix) => {
  if (!Suffix) {
    msg.reply(msg.author.avatarURL)
  }
}
module.exports.cmdMyAvatar = cmdMyAvatar


//
// COMMAND: ROLE
// 
const cmdRole = new Command()
cmdRole.name = 'role'
cmdRole.help = 'Role manager'
cmdRole.fn = (bot, msg, Suffix) => {
  if (!Suffix) {
    msg.reply('what do you want to do with roles?')
  } else {
    const suffix = Suffix.split(' ')
    const subcmd = suffix[0]
    switch (subcmd) {
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


//
// COMMAND: CHANNEL
// 
const cmdChannel = new Command()
cmdChannel.name = 'channel'
cmdChannel.help = 'channel manager'
cmdChannel.fn = (bot, msg, Suffix) => {
  if (!Suffix) {
    msg.reply('what do you want to do with the channels?')
  } else {
    const suffix = Suffix.split(' ')
    const subcmd = suffix[0]
    let channelName = msg.channel.name
    switch (subcmd) {
      case 'created':
        console.log(msg.channel.createdAt.toString())
        let response = `#${channelName} was created on `
        response += msg.channel.createdAt.toString()
        msg.channel.send(response)
          .then(console.log('sent a timestamp'))
          .catch(console.error)
        break
      case 'create':
        console.log()
        msg.channel.send()
          .catch(console.error)
        break
      default:
        msg.reply("I don't understand")
          .catch(console.error)
    }
  }
}
module.exports.cmdChannel = cmdChannel