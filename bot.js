"use strict";

// load Node libraries
const http = require("http");
const https = require("https");

// load and initialize Discord.js library
const Discord = require("discord.js");
const bot = new Discord.Client();
// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'Mzk1OTczODkyOTkwMDQyMTEz.DSaq9A.PQMvswFW-NbIue81LBzkV-PzjIo';

// load and initialize GDAX library
const Gdax = require("gdax");
const publicClient = new Gdax.PublicClient();
const gdaxAPISandbox = "https://api-public.sandbox.gdax.com";
const gdaxAPI = "https://api.gdax.com";

// load user libraries
const Commands = require("./lib/commands.js");

function hasCommand(value) {
  return Object.keys(Commands).some( key => Commands[key].name == value);
}


bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  const cmdPrefix = '$';
  if (msg.author.id != bot.user.id && msg.content[0] === cmdPrefix) {

    let cmdText = msg.content.split(" ")[0].substring(1).toLowerCase();
    let suffix = msg.content.substring(cmdText.length + 2); //add one for the $ and one for the space

    if (hasCommand(cmdText)) {
      let cmd = Commands[cmdText];

      if (cmd.name == 'help') {

        // use standard msg.process for now, more checking eventually
        cmd.process(bot, msg, suffix);
      } else {
        cmd.process(bot, msg, suffix);
      }
    } else {
      msg.channel.send("Oops, don't know that one.");
    }
    
  }

  // for testing...
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

bot.login(token);