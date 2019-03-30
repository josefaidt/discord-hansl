const chalk = require('chalk')

const logger = phrase => {
  const d = new Date()
  const timeStr = `[${d.toTimeString().split(' ')[0]}]`
  const result = chalk.gray(timeStr)
  return result.concat(' ', phrase)
}

module.exports = logger
