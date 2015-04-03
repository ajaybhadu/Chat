var express = require('express');
var router = express.Router();

/*
 * GET chat history.
 */
 //{limit:10, sort: [['_id',1]]}
router.get('/', function(req, res) {
    var db = req.db;
    var count = db.collection('chathistory').count();
    console.log(count);
    db.collection('chathistory').find().toArray(function (err, items) {
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
