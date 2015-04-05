var express = require('express');
var router = express.Router();

/*
 * GET chat history.
 */
 //
router.get('/', function(req, res) {
    var db = req.db;
    var ct;
    db.collection('chathistory').count(function(err, count) {
        ct = count - 10
    });

    db.collection('chathistory').find().sort({_id:-1}).toArray(function (err, items) {
        res.json(items);
    });
});


/*
 * POST to chat history.
 */
router.post('/', function(req, res) {
    var db = req.db;
    db.collection('chathistory').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
