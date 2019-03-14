'use strict';

const express = require('express');
const ejs = require('ejs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes');
const fs = require('fs');
const https = require('https');

// Express configuration
const app = express();
app.engine('ejs', ejs.__express);
app.use(cookieParser());
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('helmet')());

// Passport configuration
require('./auth');

//app.get('/', routes.site.index);
app.get('/login', routes.site.loginForm);
app.post('/login', routes.site.login);
app.get('/logout', routes.site.logout);
app.get('/account', routes.site.account);
app.get('/success', routes.site.success);
app.get('/fail', routes.site.fail);
app.post('/challenge', routes.site.challenge);

app.get('/dialog/authorize', routes.oauth2.authorization);
app.post('/dialog/authorize/decision', routes.oauth2.decision);
app.post('/oauth/token', routes.oauth2.token);

app.get('/api/userinfo', routes.user.info);
app.get('/api/clientinfo', routes.client.info);
app.use('/',express.static(path.join(__dirname, './client/build')));

// Might have to comment out the line of code below for some serverless environments.
// For example, it will work as is with @now/node-server, but not with @now/node.

// https://zeit.co/docs/v2/deployments/official-builders/node-js-server-now-node-server/
// vs.
// https://zeit.co/docs/v2/deployments/official-builders/node-js-now-node/

app.listen(process.env.PORT || 3000);

const options = {
    cert: fs.readFileSync('/etc/letsencrypt/live/ethereum-oauth.net/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/ethereum-oauth.net/privkey.pem')
};

https.createServer(options, app).listen(3443);

// Required for @now/node, optional for @now/node-server.
module.exports = app;
