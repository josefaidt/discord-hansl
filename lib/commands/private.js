'use strict'

// require Command class from app core
const Command = require('./core')
const config = require('../../etc/config.json')
// add allowed roles in config

const cmdPrivate = new Command()
cmdPrivate.name = 'private'
cmdPrivate.alias = 'p'
cmdPrivate.help = 'Allows users to enter a voice channel with a private role created on-demand'
cmdPrivate.fn = (bot, msg, Suffix) => {
  if (!Suffix) {
    msg.reply(msg.author.avatarURL)
  }
}

module.exports.cmdPrivate = cmdPrivate
