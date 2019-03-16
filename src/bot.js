const path = require('path')
const Discord = require('discord.js')
const ENV = require('./.config/env.dev')
const commands = require('./bin')

console.log(commands)

const bot = new Discord.Client()

// const hasCommand = value => {
//   return new Promise((resolve, reject) => {
//     Commands.forEach(i => {
//       // console.log(i, i.name, i.alias)
//       if (i.name === value || i.alias === value) {
//         resolve(i)
//       }
//     })
//     reject("Oops, I don't know that command.")
//   })
// }

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

bot.on('guildDelete', guild => {
  // this event triggers when bot is removed from a guild
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`)
  bot.user.setActivity(`Ascension ${bot.guilds.size}% Complete`)
})

bot.on('message', async message => {
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

    if (commands.filter(c => c.name === command)) {
      const [{ handleCommand }] = commands.filter(c => c.name === command)
      handleCommand(bot, message, suffix)
    } else {
      message.channel.send("Oops, don't know that command.")
    }
  }

  // for fun
  // if (message.content.toLowerCase() === 'ping') {
  //   message.reply('Pong!')
  // }
})

const loginToken = ENV.LOGIN
bot.login(loginToken).catch(console.error)
