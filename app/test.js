const { request } = require('graphql-request')

const query = `
{
  currentWeather(zip: 70769) {
    name
    weather {
      main
      description
    }
    main {
      temp
    }
  }
}
`

const url = `https://nweather.josefaidt.now.sh/api`

request(url, query).then(data => console.log(data))
