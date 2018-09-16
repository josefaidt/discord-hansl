'use strict'

module.exports.makeChannel = function makeChannel (message, name) {
  const server = message.guild
  const author = message.author.username

  server.createChannel(name, 'text')
    .then(console.log)
    .then(message.channel.send(`New channel is ${name}`))
    .catch(console.error)
}

function channelRename (message, channel) {

}
