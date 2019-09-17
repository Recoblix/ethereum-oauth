'use strict';

const passport = require('passport');
const login = require('connect-ensure-login');
const utils = require('../utils');
const settings = require('../settings');
const db = settings.db;

module.exports.index = (request, response) => response.send('OAuth 2.0 Server');

module.exports.success= (request, response) => response.send('Logging in ... ');

module.exports.fail = (request, response) => response.send('Login Failed');

module.exports.loginForm = (request, response) => response.redirect('/#');

module.exports.login = passport.authenticate('web3', { successReturnToOrRedirect: '/success', failureRedirect: '/fail' });

module.exports.addclient = (request, response) => {
  db.clients.save(request.body.client, (error, client) => {
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
