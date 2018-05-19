'use strict'

const http = require('http')
const https = require('https')
const config = require('../../etc/config.json')

// require Command class from app core
const Command = require('./core')

const cmdWeather = new Command()
cmdWeather.name = 'weather'
cmdWeather.alias = 'w'
cmdWeather.help = 'provides weather information'
cmdWeather.fn = (bot, msg, Suffix) => {
  const Weather = require('weather-js')
  let location = Suffix.split(' ').join('_')

  Weather.find({search: location, degreeType: config.weatherDegreeType}, async function(err, res) {
    if(err) console.log(err)
    const weathermsg = await JSON.stringify(res, null, 2)
    // await console.log(JSON.stringify(res, null, 2))
    const weather = await res[0]
    const temperature = weather.current.temperature + '\xB0' + weather.location.degreetype
    const message = `Currently in ${weather.location.name} it's ${temperature}`
    
    msg.channel.send(message)
    .then(message => console.log(`Sent weather information for ${weather.location.name}`))
    .catch(console.error)
  })
}
module.exports.cmdWeather = cmdWeather