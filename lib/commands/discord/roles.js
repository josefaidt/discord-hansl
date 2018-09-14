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

const sysRolePerms = [
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
  'MOVE_MEMBERS',
  'USE_VAD',
  'CHANGE_NICKNAME',
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
  const reason = `Role created to assign server-level access to ${bot.user.username} on ${guild.name}`
  const testRolePerms = [
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
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS'
  ]
  if (guild.roles.exists('name', bot.user.username)) {
    msg.reply('system role already exists')
    // eventually, "reset perms?"
  } else {
    if (can_manage_roles) {
    // Create a new role with data
      guild.createRole({
        name: bot.user.username,
        color: 'GOLD',
        hoist: true,
        position: 1,
        mentionable: true,
        permissions: ['MANAGE_ROLES']
      }, reason)
      .then(role => {
        console.log(`Created new role with name ${role.name} and color ${role.color}`)
        // role.edit({ permissions: ['MANAGE_MESSAGES', 'MANAGE_CHANNELS', 'SEND_MESSAGES'] }, 'Permission set')
        role.edit({ permissions: sysRolePerms }, 'Permission set')
          .then(`Successfully assigned permissions`)
          .catch(console.error)
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
      .then(msg.reply(sysRoleExists(bot, guild)))
    } else {
      msg.reply("Sorry, you're not important enough")
    }
  }
}

function sysRoleExists (bot, guild) {
  if (guild.roles.exists('name', bot.user.username)) {
    //   when migrating to system.js have this dm guild admins
    return 'Successfully created and assigned sysrole'
  } else {
    return 'Something went wrong setting up the system role'
  }
}

module.exports.deleteRole = (msg, bot, guild, roleName) => {
  let can_manage_roles = msg.member.hasPermission('MANAGE_ROLES')
  if (can_manage_roles) {
    if (guild.roles.exists('name', roleName)) {
      const role = guild.roles.find('name', roleName)
        // Delete a role
      role.delete('The role needed to go')
        .then(deleted => msg.reply(`Successfully deleted role: **${deleted.name}**`))
        .catch(console.error)
    } else {
      msg.reply(`The role **${roleName}** doesn't exist`)
    }
  } else {
    msg.reply("Sorry, you're not important enough")
  }
}

module.exports.createRole = (msg, bot, guild, roleName) => {
  let can_manage_roles = msg.member.hasPermission('MANAGE_ROLES')
  let reason = `Role created by ${msg.author}`
  if (can_manage_roles) {
    if (guild.roles.exists('name', roleName)) {
      msg.reply(`Role **${roleName}** already exists`)
    } else {
      guild.createRole({
        name: roleName,
        color: 'GREY',
        // hoist: false,
        position: 0,
        mentionable: false
      }, reason)
        .then(role => {
          console.log(`Created new role with name ${role.name} and color ${role.color}`)
          msg.reply(`Successfully created new role: **${roleName}**`)
        })
        .catch(e => {
          console.error(e)
          msg.reply(`I can't do that because ${e.message}`)
        })
    }
  }
}
