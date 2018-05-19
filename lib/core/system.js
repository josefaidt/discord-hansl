'use strict'

const Discord = require('discord.js')

module.exports.createSysRole = (guild, bot) => {
  const reason = `Role created to assign server-level access to ${bot.username}`
  console.log(guild.roles)
  
    // Create a new role with data
  guild.createRole({
    name: `${bot.username}`,
    color: 'GOLD',
  }, reason)
    .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
    .catch(console.error)
  
}