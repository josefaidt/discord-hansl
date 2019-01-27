class Command {
  constructor(name, alias, help, usage = '', adminOnly = false) {
    this.name = name
    this.alias = alias
    this.help = help
    this.usage = usage
    this.adminOnly = adminOnly
  }
  get name() {
    return {
      name: this.name.toUpperCase(),
      alias: this.alias.toUpperCase()
    }
  }
  get help() {
    return this.help
  }
  get adminOnly() {
    return this.adminOnly
  }
  get usage() {
    return this.usage()
  }

  set setProps({ name, alias, help, usage, adminOnly }) {
    this.name = name
    this.alias = alias
    this.help = help
    this.usage = usage
    this.adminOnly = adminOnly
  }
}

module.exports = new Command()
