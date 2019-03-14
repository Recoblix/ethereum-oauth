'use strict';

const challenges = {};

module.exports.find = (key, done) => {
  if (challenges[key]) return done(null, challenges[key]);
  return done(new Error('Code Not Found'));
};

module.exports.save = (code, username, done) => {
  challenges[code] = { username };
  done();
};
