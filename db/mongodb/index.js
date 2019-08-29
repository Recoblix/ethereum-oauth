'use strict';

const clients = require('./clients');
const accessTokens = require('./access_tokens');
const authorizationCodes = require('./authorization_codes');
const challenges = require('./challenges');

const MongoClient = require('mongodb').MongoClient;

const connect = (url,dbName) => {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    clients.connect(db);
    authorizationCodes.connect(db);
    accessTokens.connect(db);
    challenges.connect(db);
  });
}
    
module.exports = {
  connect,
  clients,
  accessTokens,
  authorizationCodes,
  challenges,
};
