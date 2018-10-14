export default class Command {
  constructor(name, alias, help, usage = '', adminOnly = false) {
    this.name = name
    this.alias = alias
    this.help = help
    this.usage = usage
    this.adminOnly = adminOnly
  }
  // createMsg() {
  //   console.log(`Command ${this.name} created!`)
  // }
}
