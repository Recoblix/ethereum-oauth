'use strict';

const db = require('./db');
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws"));

module.exports = {
  db,
  web3,
};
