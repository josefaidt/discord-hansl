const path = require('path')
const Discord = require('discord.js')
const logger = require('@hansl/logger')
const ENV = require('./.config/env.dev')
const commands = require('./bin')

console.log(commands)

const hasCommand = input => {
  return new Promise((resolve, reject) => {
    if (typeof input === 'string') {
      // handle String values
      if (input.length === 1) {
        // handle alias input
        const x = commands.filter(c => c.aliases.includes(input))
        x.length > 0 ? resolve(x) : reject(new Error(`Unable to find command alias: ${input}`))
      } else {
        // handle name input
        const x = commands.filter(c => c.name === input)
        x.length > 0 ? resolve(x) : reject(new Error(`Unable to find command name: ${input}`))
      }
    } else {
      // handle non-string (assumed int || float)
      reject(new Error('Error: command input is a number'))
    }
  })
}

const bot = new Discord.Client()

bot.on('ready', () => {
  logger('test')
  // this event triggers when bot starts successfully
  console.log(`Logged in as ${bot.user.tag}!`)
  console.log(
    `Bot has started with ${bot.users.size} users in ${bot.channels.size} channels of ${
      bot.guilds.size
    } guilds.`
  )
  bot.user.setActivity(`Ascension ${bot.guilds.size}% Complete`).catch(console.error)
})

bot.on('guildDelete', guild => {
  // this event triggers when bot is removed from a guild
  console.log(`Bot has been removed from: ${guild.name} (id: ${guild.id})`)
  bot.user.setActivity(`Ascension ${bot.guilds.size}% Complete`)
})

bot.on('message', message => {
  // ignore messages from bot, empty commands, and other bots
  if (
    message.author.id !== bot.user.id &&
    message.content[0] === ENV.PREFIX &&
    !message.author.bot
  ) {
    const command = message.content
      .split(' ')[0]
      .substring(1)
      .toLowerCase()
    // add one for the prefix and one for the space
    const suffix = message.content.substring(command.length + 2)

    console.log('-------------------------')
    console.log(`COMMAND: ${command}`)
    console.log(`SUFFIX: ${suffix}`)
    console.log('-------------------------')

    return hasCommand(command)
      .then(c => {
        const [{ handleCommand }] = c
        message.channel.send(handleCommand(suffix)).catch(e => {
          message.channel.send('Oops, something went wrong 🤢')
          console.error(e)
        })
      })
      .catch(e => {
        console.error(`Error on ${message.guild}: ${e.message}`)
        message.channel.send("Oops, I don't know that one")
      })
  }
})

const loginToken = ENV.LOGIN
bot.login(loginToken).catch(console.error)
