const path = require('path')
const Discord = require('discord.js')
const lg = require('@hansl/logger')
const { hasCommand, commands } = require('./bin')

console.log(commands)

const bot = new Discord.Client()
// Turn bot off (destroy), then turn it back on
const resetBot = channel => {
  // send channel a message that you're resetting bot [optional]
  channel
    .send('Resetting...')
    .then(msg => bot.destroy())
    .then(() => bot.login(process.env.LOGIN))
}

bot.on('ready', () => {
  // this event triggers when bot starts successfully
  console.log(lg(`Logged in as ${bot.user.tag}!`))
  console.log(
    lg(
      `Bot has started with ${bot.users.size} users in ${bot.channels.size} channels of ${
        bot.guilds.size
      } guilds.`
    )
  )
  bot.user.setActivity(`Ascension ${bot.guilds.size}% Complete`).catch(console.error)
})

bot.on('guildDelete', guild => {
  // this event triggers when bot is removed from a guild
  console.log(lg(`Bot has been removed from: ${guild.name} (id: ${guild.id})`))
  bot.user.setActivity(`Ascension ${bot.guilds.size}% Complete`)
})

bot.on('message', message => {
  // ignore messages from bot, empty commands, and other bots
  if (
    message.author.id !== bot.user.id &&
    message.content[0] === process.env.COMMAND_PREFIX &&
    !message.author.bot
  ) {
    // get command str from input
    const command = message.content
      .split(' ')[0]
      .substring(1)
      .toLowerCase()
    // add two: one for the prefix and one for the space
    const suffix = message.content.substring(command.length + 2)

    console.log('-------------------------')
    console.log(`COMMAND: ${command}`)
    console.log(`SUFFIX: ${suffix}`)
    console.log('-------------------------')

    if (command === 'reset') {
      resetBot(message.channel)
    } else {
      return hasCommand(command)
        .then(c => {
          const [{ handleCommand }] = c
          handleCommand(suffix)
            .then(r => {
              message.channel.send(r).catch(e => {
                message.channel.send('Oops, something went wrong 🤢')
                console.error(lg(e))
              })
            })
            .catch(e => {
              console.error(e)
              message.channel.send(`Uh oh, ${e.message}`)
            })
        })
        .catch(e => {
          // TODO: custom error messages, granular reporting
          if (e.name === 'TypeError') {
            console.log(e)
            console.error(lg(`Error on ${message.guild}: ${e.name} - ${e.message}`))
            message.channel.send('Yikes, something broke.')
          } else if (e.name === 'ReferenceError') {
            console.log(e)
            console.error(lg(`Error on ${message.guild}: ${e.name} - ${e.message}`))
            message.channel.send('Yikes, something broke.')
          } else if (e.name === 'DiscordAPIError') {
            console.log(e)
            console.error(lg(`Error on ${message.guild}: ${e.name} - ${e.message}`))
            message.channel.send('Yikes, something broke.')
          } else {
            console.log(e)
            console.error(lg(`Error on ${message.guild}: ${e.message}`))
            message.channel.send("Oops, I don't know that one")
          }
        })
    }
  }
})

const loginToken = process.env.LOGIN
bot.login(loginToken).catch(console.error)
