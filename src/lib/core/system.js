'use strict'

const Discord = require('discord.js')

module.exports.createSysRole = (bot, guild) => {
  const reason = `Role created to assign access to ${bot.user.username} on ${guild.name}`
  if (guild.roles.exists('name', bot.user.username)) {
    // reset permissions back to default
  } else {
    // Create a new role with data
    guild.createRole({
      name: bot.user.username,
      color: 'GOLD',
      hoist: true,
      position: 0,
      mentionable: true
    }, reason)
      .then(role => {
        console.log(`Created new role with name ${role.name} and color ${role.color}`)
        guild.fetchMember(bot.user)
          .then(u => u.addRole(role.id)
            .then(s => console.log(`Successfully assigned sysrole`))
            .catch(e => console.log(`Error creating sysrole: ${e.message}`))
          )
        .catch(e => console.log(`Error fetching bot user: ${e.message}`))
        // role.setPermissions(sysRolePerms)
        //   .then(updated => console.log(`Updated permissions to ${updated.permissions.bitfield}`))
        //   .catch(console.error)
      })
      .catch(console.error)
      // when migrating to system.js have this dm guild admins
      .then(msg.reply('Successfully created and assigned sysrole'))
      .catch(console.error)
  }
}

module.exports.dmOwner = (bot, guild) => {

}

module.exports.welcome = (guild, member, welcomeChannel) => {
  let channel = guild.channels.find('name', welcomeChannel)
  channel.send(`Welcome to ${guild.name}, ${memberName}!`)
}
