'use strict';

var collection = {};


module.exports.connect = (db) => {
  collection = db.collection('clients');
}

module.exports.save = (client, done) => {
  collection.insertOne(client,done);
};

module.exports.findById = (id, done) => {
  collection.find({'id':id}).toArray(function(err,docs){
    if(err) return done(err);
    if(docs.length == 0) return done(new Error('Client Not Found'));
    return done(null,docs[0])
  });
};

module.exports.findByClientId = (clientId, done) => {
  collection.find({'clientId':clientId}).toArray(function(err,docs){
    if(err) return done(err);
    if(docs.length == 0) return done(new Error('Client Not Found'));
    return done(null,docs[0])
  });
};
