'use strict'

const Discord = require('discord.js')

// class role {
//   constructor ({name, color, hoist = false, position, adminOnly = false, fn} = {}) {
//     this.name = name
//     this.alias = alias
//     this.help = help
//     this.usage = usage
//     this.adminOnly = adminOnly
//     this.fn = fn
//   }
// }

const sysRolePerms = {
  'ADMINISTRATOR': 0,
  'CREATE_INSTANT_INVITE': 0,
  'KICK_MEMBERS': 0,
  'BAN_MEMBERS': 0,
  'MANAGE_CHANNELS': 1,
  'MANAGE_GUILD': 0,
  'ADD_REACTIONS': 1,
  'VIEW_AUDIT_LOG': 1,
  'VIEW_CHANNEL': 1,
  'SEND_MESSAGES': 1,
  'SEND_TTS_MESSAGES': 0,
  'MANAGE_MESSAGES': 1,
  'EMBED_LINKS': 1,
  'ATTACH_FILES': 1,
  'READ_MESSAGE_HISTORY': 1,
  'MENTION_EVERYONE': 0,
  'USE_EXTERNAL_EMOJIS': 1,
  'CONNECT': 0,
  'SPEAK': 0,
  'MUTE_MEMBERS': 0,
  'DEAFEN_MEMBERS': 0,
  'MOVE_MEMBERS': 0,
  'USE_VAD': 0,
  'CHANGE_NICKNAME': 1,
  'MANAGE_NICKNAMES': 0,
  'MANAGE_ROLES': 1,
  'MANAGE_WEBHOOKS': 0,
  'MANAGE_EMOJIS': 0
}

const testRolePerms = [
  'ADMINISTRATOR',
  'CREATE_INSTANT_INVITE',
  'KICK_MEMBERS',
  'BAN_MEMBERS',
  'MANAGE_CHANNELS',
  'MANAGE_GUILD',
  'ADD_REACTIONS',
  'VIEW_AUDIT_LOG',
  'VIEW_CHANNEL',
  'SEND_MESSAGES',
  'SEND_TTS_MESSAGES',
  'MANAGE_MESSAGES',
  'EMBED_LINKS',
  'ATTACH_FILES',
  'READ_MESSAGE_HISTORY',
  'MENTION_EVERYONE',
  'USE_EXTERNAL_EMOJIS',
  'CONNECT',
  'SPEAK',
  'MUTE_MEMBERS',
  'DEAFEN_MEMBERS',
  'MOVE_MEMBERS',
  'USE_VAD',
  'CHANGE_NICKNAME',
  'MANAGE_NICKNAMES',
  'MANAGE_ROLES',
  'MANAGE_WEBHOOKS',
  'MANAGE_EMOJIS'
]

const defRolePerms = {
  CREATE_INSTANT_INVITE: true,
  KICK_MEMBERS: true,
  BAN_MEMBERS: true,
  ADMINISTRATOR: true,
  MANAGE_CHANNELS: true,
  MANAGE_GUILD: true,
  ADD_REACTIONS: true,
  READ_MESSAGES: true,
  SEND_MESSAGES: true,
  SEND_TTS_MESSAGES: true,
  MANAGE_MESSAGES: true,
  EMBED_LINKS: true,
  ATTACH_FILES: true,
  READ_MESSAGE_HISTORY: true,
  MENTION_EVERYONE: true,
  EXTERNAL_EMOJIS: true,
  CONNECT: true,
  SPEAK: true,
  MUTE_MEMBERS: true,
  DEAFEN_MEMBERS: true,
  MOVE_MEMBERS: true,
  USE_VAD: true,
  CHANGE_NICKNAME: true,
  MANAGE_NICKNAMES: true,
  MMANAGE_ROLES: true,
  MANAGE_WEBHOOKS: true,
  MANAGE_EMOJIS: true
}



module.exports.createSysRole = (msg, bot, guild) => {
  let can_manage_roles = msg.member.hasPermission('MANAGE_ROLES')
  const reason = `Role created to assign server-level access to ${bot.user.username}`
  if (guild.roles.exists('name', bot.user.username)) {
    msg.reply('Role already exists')
  } else {
    if (can_manage_roles) {
    // Create a new role with data
    guild.createRole({
      name: bot.user.username,
      color: 'GOLD',
      hoist: true,
      position: 0,
      mentionable: true,
    }, reason)
      .then(role => {
        console.log(`Created new role with name ${role.name} and color ${role.color}`)
        guild.fetchMember(bot.user)
          .then(u => u.addRole(role.id)
            .then(s => console.log(`Successfully assigned sysrole`))
            .catch(e => console.log(`Error creating sysrole: ${e.message}`))
          )
        .catch(e => console.log(`Error fetching bot user: ${e.message}`))
        role.setPermissions(sysRolePerms)
          .then(updated => console.log(`Updated permissions to ${updated.permissions.bitfield}`))
          .catch(console.error)
      })
      .catch(console.error)
      // when migrating to system.js have this dm guild admins
      .then(msg.reply('Successfully created and assigned sysrole'))
      .catch(console.error)
    
    } else {
      msg.reply("Sorry, you're not important enough")
    }
  }
}


module.exports.deleteRole = (msg, bot, guild, roleName) => {
  let can_manage_roles = msg.member.hasPermission('MANAGE_ROLES')
  if (can_manage_roles) {
    if (guild.roles.exists('name', roleName)) {
      const role = guild.roles.find('name', roleName)
        // Delete a role
      role.delete('The role needed to go')
        .then(deleted => msg.reply(`Deleted role: ${deleted.name}`))
        .catch(console.error)
    } else {
      msg.reply(`The role, ${roleName}, doesn't exist`)
    }
  } else {
    msg.reply("Sorry, you're not important enough")
  }
}