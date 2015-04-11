var express = require('express');
var router = express.Router();
var mymongo = require('../model');

/*
 * GET chat history.
 */
 //
router.get('/', function(req, res) {
    //var db = req.db;
    var db = mymongo.getDB();
    var ct;
    db.collection('chathistory').count(function(err, count) {
        ct = count - 10
    });

    db.collection('chathistory').find().limit(50).toArray(function (err, items) {
        //items.reverse();
        res.json(items);
    });
});


/*
 * POST to chat history.
 */
router.post('/', function(req, res) {
    var db = mymongo.getDB();
    db.collection('chathistory').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
