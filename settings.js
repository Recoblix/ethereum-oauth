const db = require('./db/memory');
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws"));
const url = "localhost"
const httpsOptions=false

const clients = [
  { id: '2', name: 'Samplr2', clientId: 'xyz123', clientSecret: 'ssh-password', callbackUrl: 'https://blockrecover.com/_oauth/ethereum', isTrusted: true },
];

db.clients.save(clients,() => {});

module.exports = {
  db,
  url,
  web3,
  httpsOptions,
};
