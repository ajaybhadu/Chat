var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var pDB;

module.exports.myconnect = function (url) {
    mongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        pDB = db;
    });
};

module.exports.getDB = function() { return pDB; };
