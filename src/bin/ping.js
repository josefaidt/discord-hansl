const config = {
  name: 'ping',
  aliases: ['ping', 'p'],
  description: 'play table tennis',
}

const handleCommand = (bot, msg, suffix) => {
  msg.reply('Pong!').catch(console.error)
}

module.exports = {
  ...config,
  handleCommand,
}
