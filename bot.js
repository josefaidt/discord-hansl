'use strict'

// load and initialize Discord.js library
const Discord = require('discord.js')
const bot = new Discord.Client()

const discord = require('./lib/security/discord.js')
const token = discord.token

// load user libraries
const lib = require('./lib')
const Commands = lib.commands

function hasCommand (value) {
  return Object.keys(Commands).some(key => Commands[key].name === value)
}

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`)
})

bot.on('message', msg => {
  const cmdPrefix = '$'
  if (msg.author.id !== bot.user.id && msg.content[0] === cmdPrefix) {
    let cmdText = msg.content.split(' ')[0].substring(1).toLowerCase()
    let suffix = msg.content.substring(cmdText.length + 2) // add one for the $ and one for the space

    if (hasCommand(cmdText)) {
      let cmd = Commands[cmdText]

      if (cmd.name === 'help') {
        // use standard msg.process for now, more checking eventually
        cmd.fn(msg, suffix)
      } else {
        cmd.fn(msg, suffix)
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
