'use strict';

const clients = {};

module.exports.save = (client, done) => {
  console.log(client)
  clients[client.clientId] = client;
  done();
};

module.exports.findById = (clientId, done) => {
  if (clients[clientId]) return done(null, clients[clientId]);
  return done(new Error('Client Not Found'));
};

module.exports.findByClientId = (clientId, done) => {
  if (clients[clientId]) return done(null, clients[clientId]);
  return done(new Error('Client Not Found'));
};
