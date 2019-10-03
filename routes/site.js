'use strict';

const ethUtil = require('ethereumjs-util');
const { toChecksumAddress } = require('web3-utils');
const passport = require('passport');
const login = require('connect-ensure-login');
const utils = require('../utils');
const settings = require('../settings');
const db = settings.db;
const web3 = settings.web3;

module.exports.index = (request, response) => response.send('OAuth 2.0 Server');

module.exports.success= (request, response) => response.send('Logging in ... ');

module.exports.fail = (request, response) => response.send('Login Failed');

module.exports.loginForm = (request, response) => response.redirect('/login');

module.exports.login = passport.authenticate('web3', { successReturnToOrRedirect: '/success', failureRedirect: '/fail' });

module.exports.addclient = (request, response) => {
  console.log(request.body)
  const challenge = utils.signTypedData({
    ...utils.addClientMessage,
    message: request.body.message,
  })
  console.log(challenge)
  const signature = request.body.signature.substring(2);
  const r = "0x" + signature.substring(0, 64);
  const s = "0x" + signature.substring(64, 128);
  const v = parseInt(signature.substring(128, 130), 16);
  const address = "0x" + ethUtil.pubToAddress(ethUtil.ecrecover(challenge,v,r,s)).toString("hex")
  console.log(toChecksumAddress(address))
  console.log(toChecksumAddress(request.body.signer))
  if(toChecksumAddress(address)!=toChecksumAddress(request.body.signer)) return done(null,false); //handle this better
  db.clients.save({
    name: request.body.message.name,
    clientId: request.body.message.name + " - " + request.body.signer,
    clientSecret: request.body.message.clientSecret,
    callbackUrl: request.body.message.callbackUrl,
    isTrusted: true,
  }, (error, client) => {
    if(error) return response.error(error);
    return response.json(client);
  });
}

module.exports.challenge = (request, response) => {
  const code = utils.getUid(16);
  db.challenges.save(code, request.body.account, (error) => {//validate input to prevent injection attacks
    if (error) return response.error(error);
    return response.json({ code });
  });
};

module.exports.logout = (request, response) => {
  request.logout();
  response.redirect('/');
};

module.exports.account = [
  login.ensureLoggedIn(),
  (request, response) => response.render('account', { user: request.user }),
];
