'use strict'

const http = require('http')
const https = require('https')

// load and initialize GDAX library
const Gdax = require('gdax')
const publicClient = new Gdax.PublicClient()

function logError (error) {
  console.error(`GDAX ERROR: ${console.error(error.message)}`)
}

const Coins = {
  'btc': {
    name: 'Bitcoin',
    id: 'BTC-USD',
    base: 'btc'
  },
  'ltc': {
    name: 'Litecoin',
    id: 'LTC-USD',
    base: 'ltc'
  },
  'bch': {
    name: 'Bitcoin Cash',
    id: 'BCH-USD',
    base: 'bch'
  },
  'eth': {
    name: 'Ethereum',
    id: 'ETH-USD',
    base: 'eth'
  }
}

function printCoinData (selection, data) {
  const message = `The current price for ${selection.name} is $${data.bid}`
  return message
}

function hasCoin (coin) {
  return Object.values(Coins).some(value => Coins[coin])
}

function getCoin (coin, ...suffix) {
  publicClient.getProducts((error, response, data) => {
    if (error) {
      // handle the error
      console.error(error)
    } else if (!response) {
      console.log('GDAX: No response received')
      return 'Oops, no response from GDAX.'
    } else {
      // work with data
      // console.log(data);
      // console.log(Object.values(Coins).some( key => Coins[coin]))
      // console.log(Object.values(Coins))
      if (hasCoin(coin)) {
        let selection = Coins[coin]

        // test to be sure selection matches available products
        if (Object.keys(data).some(key => data[key].id === selection.id)) {
          console.log(`you've selected ${selection.name}`)
        } else {
          console.log('Oops, looks like that coin is no longer supported')
        }

        // console.log(`you've selected ${Coin.id}`);
      } else {
        console.log("Oops, don't know that one")
      }
    }
  })
}

function currentPrice (coin, ...suffix) {
  publicClient.getProductTicker((error, response, data) => {
    if (error) {
      // handle the error
      console.error(error)
    } else if (!response) {
      console.log('GDAX: No response received')
      return 'Oops, no response from GDAX.'
    } else {
      // work with data
      // console.log(data);
      if (hasCoin(coin)) {
        let selection = Coins[coin]
        // console.log(`The current price for ${selection.name} is $${data.bid}`)
        // console.log(printCoinData(selection, data)) // logs correctly
        return printCoinData(selection, data)
      } else {
        console.log("Oops, don't know that one")
        return "Oops, don't know that one"
      }
    }
  })
}

module.exports.getCoin = getCoin
module.exports.currentPrice = currentPrice