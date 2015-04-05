var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var db = req.db;
    db.collection('chathistory').count(function (err, count) {
        res.json(count);
    });
});

module.exports = router;
