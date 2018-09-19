'use strict'

const Command = require('../core.js')

//
// COMMAND: CLEAR
//
const cmdClear = new Command()
cmdClear.name = 'clear'
cmdClear.help = 'deletes messages'
cmdClear.fn = async (bot, msg, Suffix) => {
  if (!Suffix) {
    // Delete a message
    // msg.delete(50) // 50ms delay
    // .then(message => console.log(`Deleted message from ${message.author.username}: "${message.content}"`))
    // .catch(console.error)
    const fetched = await msg.channel.fetchMessages({limit: 2}) // +1 for command msg
    if (fetched.exists('author', !msg.author)) {
      msg.channel.bulkDelete(fetched)
      .catch(error => msg.reply(`Couldn't delete messages because: ${error}`))
    } else {
      msg.reply('You can only delete messages that are yours')
    }
  } else {
    const suffix = Suffix.split(' ')
    const numOfMsgs = parseInt(suffix[0], 10)

    let can_manage_msgs = msg.member.hasPermission('MANAGE_MESSAGES')
    if (can_manage_msgs) {
      // https://discord.js.org/#/docs/main/stable/class/MessageCollector
      const fetched = await msg.channel.fetchMessages({limit: (numOfMsgs + 1)}) // +1 for command msg
      msg.channel.bulkDelete(fetched)
        .catch(error => msg.reply(`Couldn't delete messages because: ${error}`))

      // let n = parseInt(numOfMsgs)
      // if (isNaN(n)) {
      //   msg.channel.send("I didn't get that.")
      // }
    } else {
      msg.reply("Sorry, you don't have the permission to bulk delete messages")
    }
  }
}
module.exports.cmdClear = cmdClear
