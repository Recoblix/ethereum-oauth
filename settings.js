'use strict';

const db = require('./db');
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws"));

const httpsOptions = {
    cert: fs.readFileSync('/etc/letsencrypt/live/ethereum-oauth.net/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/ethereum-oauth.net/privkey.pem')
};

const clients = [
  { id: '2', name: 'Samplr2', clientId: 'xyz123', clientSecret: 'ssh-password', callbackUrl: 'https://blockrecover.com/_oauth/ethereum', isTrusted: true },
];

module.exports = {
  db,
  web3,
  httpsOptions,
  clients,
};
