'use strict';

const ENS = require('ethereum-ens');
const passport = require('passport');
const CustomStrategy= require('passport-custom').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const Accounts = require('web3-eth-accounts');
const { isAddress, toChecksumAddress } = require('web3-utils');
const path = require('path');

const utils = require('../utils');
const { hashPersonalMessage, toBuffer } = require('ethereumjs-util')
const settings = require('../settings');
const db = settings.db;
const web3 = settings.web3;

const provider = web3.currentProvider
provider.sendAsync = provider.send
const ens = new ENS(provider);

passport.serializeUser((user, done) =>  done(null, user.id));


const getEnsName = (address,done) => {
  ens.reverse(address).name().then((ensId) => {
    ens.resolver(ensId).addr().then((resolvedAddr) => {
      if(toChecksumAddress(resolvedAddr)!=toChecksumAddress(address)) throw "ENS misconfigured";
      return done(null,{
        name: ensId, 
        address: toChecksumAddress(resolvedAddr),
      })
    })
  }).catch((err) => {
    return done(null,{
      address: address,
      name: address,
    })
  })
}

const deserializeUser = (address, done) => {
  getEnsName(address,(err,user) => {
    return done(err,{
      id: user.name,
      user_id: user.name,
      name: user.address,
      username: user.name,
      picture: path.join(settings.url,user.name),
      email: user.name + settings.emailSuffix,
      validated: true,
    })
  })
}

passport.deserializeUser(deserializeUser)

passport.use('web3', new CustomStrategy(
  function(req,done){// TODO: add validation to prevent injection
    db.challenges.find(req.body.challenge, (error, challenge) => {
      if(error) return done(error);
      if(req.body.username != challenge.username) return done(null,false);
      utils.isValidSignature(hashPersonalMessage(Buffer.from(req.body.challenge)),req.body.signature,challenge.username).then((valid) => {
        if(valid){
          return deserializeUser(challenge.username,done)
        } else {
          return done(null,false)
        }
      })
    });
  }
));
/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients. They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens. The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate. Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header). While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
function verifyClient(clientId, clientSecret, done) {
  db.clients.findByClientId(clientId, (error, client) => {
    if (error) return done(error);
    if (!client) return done(null, false);
    if (client.clientSecret !== clientSecret) return done(null, false);
    return done(null, client);
  });
}

passport.use(new BasicStrategy(verifyClient));

passport.use(new ClientPasswordStrategy(verifyClient));

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token). If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(new BearerStrategy(
  (accessToken, done) => {
    db.accessTokens.find(accessToken, (error, token) => {
      if (error) return done(error);
      if (!token) return done(null, false);
      if (token.userId) {
        deserializeUser(token.userId,(error,user) => {
          if (error) return done(error);
          done(null, user, { scope: '*' });
        });
      } else {
        // The request came from a client only since userId is null,
        // therefore the client is passed back instead of a user.
        db.clients.findByClientId(token.clientId, (error, client) => {
          if (error) return done(error);
          if (!client) return done(null, false);
          // To keep this example simple, restricted scopes are not implemented,
          // and this is just for illustrative purposes.
          done(null, client, { scope: '*' });
        });
      }
    });
  }
));
