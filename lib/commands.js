module.exports = {
  "help": {
    name: "help",
    description: "Lists commands and can return command information.",
    extendedhelp: "This will list all commands and command information.",
    adminOnly: false,
    process: (msg, Commands) => {
      msg.channel.send(Commands)
    }
  },
  "servers": {
    name: "servers",
    description: "Lists servers bot is connected to.",
    extendedhelp: "This will list all the servers I'm currently connected to, but if I'm in a lot of servers, don't expect a response.",
    adminOnly: true,
    process: (bot, msg) => {
     msg.channel.send(`${bot.servers}`)
      .then(message => console.log(`Sent test message`));
    }
  },
  "test": {
    name: "test",
    description: "sends back test response",
    extendedhelp: "really, it's just for testing",
    adminOnly: true,
    process: (bot, msg) => {
      // Send a message
      msg.channel.send('hello!')
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error);
    }
  }
};