const getDateInfo = UnixTimestamp => {
  const d = new Date(UnixTimestamp * 1000)
  return {
    dateString: d.toLocaleDateString(),
    timeString: d.toLocaleTimeString(),
    day: d.getDate(),
    dayString: d.toLocaleString('en-us', { weekday: 'long' }),
    month: d.getMonth(),
    monthString: d.toLocaleString('en-us', { month: 'long' }),
    year: d.getFullYear(),
    hour: d.getHours(),
    minute: d.getMinutes(),
  }
}

const extractWeatherInfo = rawData => {
  const {
    forecast: { cnt: count, list },
  } = rawData

  return new Promise((resolve, reject) => {
    const forecastList = list.map(i => {
      return {
        date: getDateInfo(i.dt),
        temp: i.main.temp,
        temp_min: i.main.temp_min,
        temp_max: i.main.temp_max,
        summary: i.weather[0].main,
        description: i.weather[0].description,
      }
    })
    resolve(forecastList)
  })
}

const polishData = data => {
  return new Promise((resolve, reject) => {
    extractWeatherInfo(data)
      .then(forecastList => resolve(forecastList))
      .catch(e => {
        reject(new Error('something went wrong with retrieving the data'))
      })
  })
}

const formatMessage = polishedData => {
  const { monthString, day, year } = polishedData[0].date
  return new Promise((resolve, reject) => {
    let message = `The forecast beginning with ${monthString} ${day}, ${year} is as follows:\n\`\`\`\n`
    const dashes = '---'
    polishedData.forEach(d => {
      const header = `${d.date.dayString} - ${d.date.dateString.slice(0, d.date.dateString.length)}`
      const description = `${d.temp.toString().split('.')[0]}°F and ${d.description} ${
        d.temp_max - d.temp_min > 2 ? `with a low of ${d.temp_min} and a high of ${d.temp_max}` : ``
      }`
      message += `${dashes}\n${header}\n${description}\n`
    })
    message += `${dashes}\`\`\``
    resolve(message)
  })
}

module.exports = { polishData, formatMessage }
