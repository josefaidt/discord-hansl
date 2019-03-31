const config = {
  name: 'ping',
  aliases: ['ping', 'p'],
  description: 'play table tennis',
}

const handleCommand = suffix => {
  return new Promise(resolve => {
    // msg.reply('Pong!').catch(console.error)
    resolve('Pong!')
  })
}

module.exports = {
  ...config,
  handleCommand,
}
