'use strict'

// load and initialize Discord.js library
const Discord = require('discord.js')
const bot = new Discord.Client()

const config = require('./etc/config.json')
const token = config.loginToken

// load user libraries
const lib = require('./lib')
const Commands = lib.commands

function hasCommand (value) {
  // return Object.keys(Commands).some(key => Commands[key].name === value)
  if (Commands.get(value)) {
    return true
  } else {
    return false
  }
}

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`)
})

bot.on('message', msg => {
  const cmdPrefix = config.cmdPrefix
  if (msg.author.id !== bot.user.id && msg.content[0] === cmdPrefix) {
    let cmdText = msg.content.split(' ')[0].substring(1).toLowerCase()
    let suffix = msg.content.substring(cmdText.length + 2) // add one for the $ and one for the space
    // msg.channel.send(`suffix is ${suffix}`)

    if (hasCommand(cmdText)) {
      // let cmd = Commands[cmdText]
      let cmd = Commands.get(cmdText)

      if (cmd.name === 'help') {
        // use standard msg.process for now, more checking eventually
        cmd.fn(bot, msg, suffix)
      } else {
        cmd.fn(bot, msg, suffix)
      }
    } else {
      msg.channel.send("Oops, don't know that command.")
    }
  }

  // for testing...
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
})

bot.login(token)
