'use strict'

// load and initialize Discord.js library
const Discord = require('discord.js')
const bot = new Discord.Client()

const config = require('./etc/config.json')

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
  // this event triggers when bot starts successfully
  console.log(`Logged in as ${bot.user.tag}!`)
  console.log(`Bot has started with ${bot.users.size} users in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`)
  bot.user.setActivity(`Ascension ${bot.guilds.size}% Complete`)
    .catch(console.error)
})

bot.on('guildCreate', guild => {
  // this event triggers when bot joins a guild
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members`)
  bot.user.setActivity(`Ascension ${bot.guilds.size}% Complete`)
})

bot.on('guildDelete', guild => {
  // this event triggers when bot is removed from a guild
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`)
  bot.user.setActivity(`Ascension ${bot.guilds.size}% Complete`)
})

bot.on('message', async message => {
  // ignore messages from bot, empty commands, and other bots
  if (message.author.id !== bot.user.id && message.content[0] === config.prefix && !message.author.bot) {
    let command = message.content.split(' ')[0].substring(1).toLowerCase()
    let suffix = message.content.substring(command.length + 2) // add one for the prefix and one for the space
    if (hasCommand(command)) {
      let cmd = Commands.get(command)
      // let suffix = Suffix.split(' ')
      if (cmd.name === 'help') {
        cmd.fn(bot, message, suffix)
      } else {
        cmd.fn(bot, message, suffix)
      }
    } else if (command === 'ping') {
      const m = await message.channel.send('Ping?')
      m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`)
    } else { message.channel.send("Oops, don't know that command.") }
  }

  // for fun
  if (message.content.toLowerCase() === 'ping') { message.reply('Pong!') }
})

bot.login(config.loginToken)
