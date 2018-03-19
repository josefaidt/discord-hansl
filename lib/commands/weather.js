'use strict'

const http = require('http')
const https = require('https')
const api = require('../security/weather.json')

// require Command class from app core
const Command = require('./core')

// default weather cmd
function printWeather (weather) {
  const message = `Current temperature in ${weather.location.city} is ${weather.current_observation.temp_f}F`;
  // console.log(message)
  return message
}

// Print out error message
function printError (error) {
  console.error(error.message)
  return error.message
}

function getWeather (query) {
  // const readableQuery = query.replace('_', ' ');
  if (isNaN(query.get('zip'))) {
    const state = query.get('state')
    const city = query.get('city')
    try {
      const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query.get('state')}/${query.get('city')}.json`, response => {
        // console.log(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query.get('state')}/${query.get('city')}.json`)
        if (response.statusCode === 200) {
          let body = ''
        // Read the data
          response.on('data', chunk => {
            body += chunk
          })
          response.on('end', () => {
            try {
            // Parse the data
              const weather = JSON.parse(body)
            // Check if the location was found before printing
              if (weather.location) {
              // Print the data
                // console.log(printWeather(weather))
                return printWeather(weather)
              } else {
                const queryError = new Error(`The location "${city} ${state}" was not found.`)
                printError(queryError)
              }
            } catch (error) {
            // Parse Error
              printError(error)
            }
          })
        } else {
        // Status Code Error
          const statusCodeError = new Error(`There was an error getting the message for ${readableQuery}. (${http.STATUS_CODES[response.statusCode]})`)
          printError(statusCodeError)
        }
      })

      request.on('error', printError)
    } catch (error) {
    // Malformed URL Error
      printError(error)
    }
  }
}

const cmdWeather = new Command()
cmdWeather.name = 'weather'
cmdWeather.help = 'provides weather information'
cmdWeather.fn = function (bot, msg, Suffix) {
  let suffix = Suffix.split(' ').join('_')

  let location = new Map()

  let state = null
  let city = null
  let zip = NaN
  location.set('zip', zip)
  // try {
  //   zip = parseInt(Suffix)
  //   location.set('zip', zip)
  //   console.log(`Zip code: ${zip} and it is a ${typeof zip}`)
  // } catch (e) {
  //   console.error(e.message)
  // }
  try {
    if (suffix.split('_')[1].length === 2) {
      state = Suffix.split(' ')[1].toUpperCase()
      location.set('state', state)
      city = Suffix.split(' ').splice(0, 1)
      location.set('city', city)
    } else if (suffix.split('_')[2].length === 2) {
      state = suffix.split('_')[2]
      location.set('state', state)
      city = Suffix.split(' ').splice(0, 2).join('_')
      location.set('city', city)
    } else {
      msg.channel.send('Oops, missing something')}
  } catch (e) {
    printError(msg, e)
  }


  // NOTE: not getting a response fast enough. try to run asynchronously
  // const weather = getWeather(location)
  // console.log(`weather is ${weather}`)

  // const weatherPromise = new Promise((resolve, reject) => {
  //   // do something asynchronous which eventually calls either:
  //   const weather = getWeather(location)
  //   if (weather !== undefined) {
  //     resolve(weather)
  //   } else {
  //     reject('rejected')
  //   }
  //   //   resolve(someValue); // fulfilled
  //   console.log(`weather is ${weather}`)
  //   // or
    
  //   //   reject("failure reason"); // rejected
  // }).catch( e => {
  //   console.error(e.message)
  // })

  // console.log(getWeather(location))
  msg.channel.send(getWeather(location))
      .then(message => console.log(`Sent weather information`))
      .catch(console.error)
}

module.exports.cmdWeather = cmdWeather