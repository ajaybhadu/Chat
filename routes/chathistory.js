var express = require('express');
var router = express.Router();

/*
 * GET chat history.
 */
router.get('/', function(req, res) {
    var db = req.db;
    db.collection('chathistory').find().skip(db.collection.count() - N).toArray(function (err, items) {
        res.json(items);
    });
});


/*
 * POST to adduser.
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
