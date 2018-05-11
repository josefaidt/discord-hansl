class Quirk {
  constructor ({name, help, usage, fn} = {}) {
    this.name = name
    this.help = help
    this.usage = usage
    this.adminOnly = adminOnly
    this.fn = fn
  }
}
module.exports = Quirk

// 
// REPORTS LOYALTY
// sends number of users it servers
// for u in bot.users 
//   check if user is bot if(bot.users[u].bot)