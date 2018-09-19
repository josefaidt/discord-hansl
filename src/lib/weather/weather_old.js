// 'use strict'

// const config = require('../../etc/config.json')

// // require Command class from app core
// const Command = require('../Command')
// const Weather = require('weather-js')

// const cmdWeather = new Command({
//   name: 'weather',
//   alias: 'w',
//   help: 'provides weather information',
//   fn: (bot, msg, Suffix) => {
//     let location = Suffix.split(' ').join('_')
//     if (location.length === 0) {
//       msg.channel.send('I need a location').catch(console.error)
//     }

//     Weather.find(
//       { search: location, degreeType: config.weatherDegreeType },
//       async (err, res) => {
//         if (err) {
//           // msg.channel.send('Something went wrong while fetching the weather')
//           console.log(err)
//         }
//         const weathermsg = await JSON.stringify(res, null, 2)
//         // await console.log(JSON.stringify(res, null, 2))
//         const weather = await res[0]
//         if (!weather) {
//           msg.channel.send("I can't find that location")
//         } else {
//           const temperature =
//             weather.current.temperature + '\xB0' + weather.location.degreetype
//           const message = `Currently in ${
//             weather.location.name
//           } it's ${temperature}`

//           msg.channel
//             .send(message)
//             .then(message =>
//               console.log(
//                 `Sent weather information for ${weather.location.name}`
//               )
//             )
//             .catch(console.error)
//         }
//       }
//     )
//   }
// })

// module.exports.cmdWeather = cmdWeather
