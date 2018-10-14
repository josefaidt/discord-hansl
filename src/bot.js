'use strict'
import '@babel/polyfill'
// load and initialize Discord.js library
// import Discord from 'discord.js'
// import path from 'path'
import Discord from 'discord.js'
import path from 'path'
// load user libraries
import lib from './lib' // temporary use!!
import Commands from './bin'

const bot = new Discord.Client()

// if PROD, use dotenv to import environment vars
if (process.env.NODE_ENV !== 'PROD') {
  require('dotenv').load()
}
console.log('LIBRARY', lib)
console.log('COMMANDS', Commands)

function hasCommand(value) {
  return new Promise((resolve, reject) => {
    Commands.forEach(i => {
      // console.log(i, i.name, i.alias)
      if (i.name === value || i.alias === value) {
        resolve(i)
      }
    })
    reject("Oops, I don't know that command.")
  })
  // if (Commands[value]) {
  //   return true
  // } else {
  //   return false
  // }
}

bot.on('ready', () => {
  // this event triggers when bot starts successfully
  console.log(`Logged in as ${bot.user.tag}!`)
  console.log(
    `Bot has started with ${bot.users.size} users in ${bot.channels.size} channels of ${
      bot.guilds.size
    } guilds.`
  )
  bot.user.setActivity(`Ascension ${bot.guilds.size}% Complete`).catch(console.error)
})

bot.on('guildCreate', guild => {
  // this event triggers when bot joins a guild
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members`
  )
  bot.user.setActivity(`Ascension ${bot.guilds.size}% Complete`)

  if (!guild.roles.hansl) {
    // add system role creation
  }
})

bot.on('guldMemberAdd', member => {
  lib.core.system.welcome(member.guild, member.user.username, process.env.WELCOME_CHANNEL)
  // add custom message
  // get all text channels for config page, then select ID to mitigate multiple channels of the same name
})

bot.on('guildDelete', guild => {
  // this event triggers when bot is removed from a guild
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`)
  bot.user.setActivity(`Ascension ${bot.guilds.size}% Complete`)
})

bot.on('message', async message => {
  // ignore messages from bot, empty commands, and other bots
  // how do we handle mentions? (ex: @voltron)
  if (
    message.author.id !== bot.user.id &&
    message.content[0] === process.env.PREFIX &&
    !message.author.bot
  ) {
    const command = message.content
      .split(' ')[0]
      .substring(1)
      .toLowerCase()
    const suffix = message.content.substring(command.length + 2) // add one for the prefix and one for the space

    hasCommand(command.toLowerCase())
      .then(
        cmdObject => {
          cmdObject.default(bot, message, suffix)
        },
        reason => {
          message.channel.send(reason)
        }
      )
      .catch(() => {
        message.channel.send("Oops, don't know that command.")
      })
    // } else if (command === 'ping') {
    //   const m = await message.channel.send('Ping?')
    //   m.edit(
    //     `Pong! Latency is ${m.createdTimestamp -
    //       message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`
    //   )
    // } else {
    //   message.channel.send("Oops, don't know that command.")
    // }
  }

  // for fun
  if (message.content.toLowerCase() === 'ping') {
    message.reply('Pong!')
  }
})

// set login token, either from .env or vscode launch.json
const loginToken = process.env.LOGIN
bot.login(loginToken).catch(console.error)
