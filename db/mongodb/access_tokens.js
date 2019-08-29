'use strict';

var collection = {};

module.exports.connect = (db) => {
  collection = db.collection('tokens');
}



module.exports.find = (key, done) => {
  collection.find({'token':key}).toArray(function(err,docs){
    if(err) return done(err);
    if(docs.length == 0) return done(new Error('Token Not Found'));
    return done(null,docs[0])
  });
};

module.exports.findByUserIdAndClientId = (userId, clientId, done) => {
  collection.find({'userId':userId, 'clientId':clientId}).toArray(function(err,docs){
    if(err) return done(err);
    if(docs.length == 0) return done(new Error('Token Not Found'));
    return done(null,docs[0])
  });
};

module.exports.save = (token, userId, clientId, done) => {
  collection.insertOne({ token, userId, clientId },done);
};
