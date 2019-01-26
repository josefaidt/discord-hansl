import Command from './Command'

export default class Library {
  contructor({
    name = '',
    needsAPIKey = false,
    subCommands = [],
    isSubCommand = false,
    subCommandClassInfo = null || {}
  }) {
    this.name = 'Library_' + name
    this.needsAPIKey = needsAPIKey
    this.subCommands = subCommands
    this.isSubCommand = isSubCommand
    this.subCommand = new Command(subCommandClassInfo)
  }

  static getNeedsAPIKey() {
    return this.needsAPIKey
    // return new Promise((resolve, reject) => {
    //   if (this.needsAPIKey === undefined) {
    //     reject(this.needsAPIKey)
    //   } else {
    //     resolve(this.needsAPIKey)
    //   }
    // })
  }
}
