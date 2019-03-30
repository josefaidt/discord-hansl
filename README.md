<p align="center">
  <a href="https://github.com/josefaidt/discord-hansl">
    <img
      alt="hansl"
      src="https://github.com/josefaidt/discord-hansl/blob/master/img/hansl_banner.png"
      width="1000"
    />
  </a>
</p>

![GitHub package version](https://img.shields.io/github/package-json/v/josefaidt/discord-hansl.svg?style=flat-square)

[![code style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)
![dependencies](https://img.shields.io/david/josefaidt/discord-hansl.svg?style=flat-square)
![dev dependencies](https://img.shields.io/david/dev/josefaidt/discord-hansl.svg?style=flat-square)
![License](https://img.shields.io/github/license/josefaidt/discord-hansl.svg?style=flat-square)

A Discord bot built using Node.js, [discordjs](https://discord.js.org/#/), and a custom GraphQL weather endpoint - [nWeather](https://github.com/josefaidt/nWeather) as a weather-reporting bot.

## ZEIT NOW

*Coming Soon!*

## Docker

This app includes a `Dockerfile` to build an image off of, as long as you have a valid `.env` file to run using. The scripts to build are saved in `package.json`

```json5
"scripts": {
  "build:docker": "yarn build:prod; yarn build:docker:image; yarn build:docker:container",
  "build:docker:image": "docker build --tag josef/hansl:latest --tag josef/hansl:$npm_package_version .",
  "build:docker:image:remote": "docker build https://github.com/josefaidt/discord-hansl.git",
  "build:docker:container": "docker stop hansl; docker rm hansl; docker container run -p 3000:3000 --name hansl --hostname APP_DISCORD_HANSL --env-file ./.env josef/hansl:$npm_package_version"
}
```

### Building Using Provided Scripts

Ensure you have both yarn and Docker installed in order to successfully build the image and container.

- `build:docker:image`: builds the Docker image using the local assets
- `build:docker:image:remote`: builds the Docker image using the master branch on the repository
- `build:docker:container`: stops and removes existing containers using the name `hansl`, and builds a new container using the pulled image.
  - `env-file` (*required*): specify using an absolute path your environment dotfile based off provided `.config/.env.sample`
- `build:docker`: runs the production build process, builds the Docker image from local assets, builds Docker container

## Early Stages

For information regarding the status of this project, please visit the [kanban board](https://www.notion.so/josefaidt/33e5339ee4a5428291aee596760bf828?v=85cf15c18e8e41969b9975d68c2f97cb) and the [changelog](https://github.com/josefaidt/discord-hansl/blob/master/CHANGELOG.MD).