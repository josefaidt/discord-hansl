# Change Log
All notable changes to the Hansl bot will be documented in this file.

## [Unreleased]
---
## [0.0.4.1] - 2018-05-19
### Added
- /lib/commands/discord/roles.js
  - created system role creation test
  - created delete role
- /lib/commands/discord.js
  - polished clear command
    - if user does not have manage messages permission it doesn't allow clear
  - clear without suffix deletes last message, too
    - only if last message was also users
- /lib/core/system.js
  - created skeleton system file
  - uses include: bot setup, checks for on-start

## [0.0.4.0] - 2018-05-08
### Added
- /lib/commands/core/*
  - added loader
  - added quirks
- /lib/commands/general.js
- bot.js
  - added a few functions logging generic statistics
  - setActivity added
  - cleaned up message handler
  - added ping command
- /etc/sample.config.json
  - removed WeatherUnderground key
  - added weatherDegreeType
- /lib/commands/weather.js
  - added weather-js package
  - removed WeatherUnderground functions

## [0.0.3.3] - 2018-03-21
- /lib/commands/discord.js - added channel command

## [0.0.3.2] - 2018-03-20
### Added
- /etc/sample.config.json - added sample config, changed way bot reads config values
- /lib/commands/help - built and added help command to return list of commands

## [0.0.3.1] - 2018-03-18
### Added
- dynamic module loader, sets CommandMap
- /lib/commands/discord.js - discord commands, added avatar

### Changed
- began async process for weather cmd
- bot.js - passing bot through commands for bot stats, uses

## [0.0.3] - 2018-03-18
### Added
- /lib/commands/core.js - app core with Command class
- /lib/commands/index.js - command module loader
- split weather out into individual file
- better command stream, will split out discord commands

### Changed
- targeting latest base image version in Dockerfile

## [0.0.2] - 2018-03-15
### Added
- security fix
- added require-directory for modules
- name change
- Command class
- command stream (/lib/index.js)
- cmd: test
- cmd: weather

## [0.0.1] - 2017-12-28
### Initial Commit
- functioning bot with command structure
- intial Dockerfile for setup
- yarn project init with the following dependencies:
  - discordjs
  - gdax