'use strict';

var collection = {};

module.exports.connect = (db) => {
  collection = db.collection('challenges');
}


module.exports.find = (key, done) => {
  collection.find({'code':key}).toArray(function(err,docs){
    if(err) return done(err);
    if(docs.length == 0) return done(new Error('Challenge Not Found'));
    return done(null,docs[0])
  });
};

module.exports.save = (code, username, done) => {
  collection.insertOne({ code, username },done);
};
