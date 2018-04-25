'use strict'

// require Command class from app core
const Command = require('./core')
const dir = require('require-directory')
const discord = dir(module, './discord')
const Discord = require('discord.js')
// console.log(discord)

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
        const newName = suffix[1]
        if (newName) {
          discord.channel.makeChannel(msg, newName)
        } else {
          msg.channel.send('I need a name for the channel')
            .catch(console.error)
        }
        break
      case 'delete':
        // const channelName = suffix[1]
        msg.channel.delete()
          .then(`Deleted channel: ${console.log}`)
          .catch(console.error)
      default:
        msg.reply("I don't understand")
          .catch(console.error)
    }
  }
}
module.exports.cmdChannel = cmdChannel

const cmdClear = new Command()
cmdChannel.name = 'clear'
cmdChannel.help = 'deletes messages'
cmdChannel.fn = (bot, msg, Suffix) => {
  if (!Suffix) {
    // Delete a message
    msg.delete(50)
    .then(message => console.log(`Deleted message from ${message.author.username}: "${message.content}"`))
    .catch(console.error);
  } else {
    const suffix = Suffix.split(' ')
    const numOfMsgs = suffix[0]

    // https://discord.js.org/#/docs/main/stable/class/MessageCollector
    const messages = new Discord.MessageCollector(msg.channel)
    console.log(messages)
  }


}
module.exports.cmdClear = cmdClear