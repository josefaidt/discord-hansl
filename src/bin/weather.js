const weather = require('../lib').weather

export default {
  default: (bot, msg, Suffix) => {
    const location = Suffix.split(' ').join('_')
    const suffix = Suffix.split(' ')
    // console.log(Suffix.split(' '))
    if (location.length === 0) {
      msg.channel.send('I need a location').catch(console.error)
    } else if (suffix.length > 1) {
      let subcmd = suffix[0]
    }
  }
}
