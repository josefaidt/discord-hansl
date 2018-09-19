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
          discord.roles.createRole(msg, bot, msg.guild, roleName)
        }
        break
      case 'sys': // for testing
        if (msg.author.id === msg.guild.owner.id) {
          discord.roles.createSysRole(msg, bot, msg.guild)
        } else {
          msg.reply('Sorry this command is restricted to the server owner')
        }
        break
      case 'delete':
        let roleName = suffix[1]
        discord.roles.deleteRole(msg, bot, msg.guild, roleName)
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

const cmdWelcome = new Command()
cmdChannel.name = 'welcome'
cmdChannel.help = 'sends welcome messages'
cmdChannel.adminOnly = true // testing purposes
cmdChannel.fn = (bot, msg, Suffix) => {
  function welcome (guild, memberName, welcomeChannel) {
    let channel = guild.channels.find('name', welcomeChannel)
    channel.send(`Welcome to ${guild.name}, ${memberName}!`)
  }
  welcome(msg.guild, msg.author.username, 'general')
}
module.exports.cmdWelcome = cmdWelcome
