var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Database
//var mongo = require('mongoskin');
//var db = mongo.db("mongodb://heroku_app35497516:hs9rcp1ubilun0t5hov8u4tvl3@ds059821.mongolab.com:59821/heroku_app35497516", {native_parser:true});
//var mongoconnect = require('./mongoconnect.js');
var routes = require('./routes/index');
var users = require('./routes/users');
var chathistory = require('./routes/chathistory');
var test = require('./routes/test');

var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//var url = 'mongodb://localhost:27017/chat';
var url = 'mongodb://heroku_app35497516:hs9rcp1ubilun0t5hov8u4tvl3@ds059821.mongolab.com:59821/heroku_app35497516';

var app = express();
var myDB;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    myDB = db;
    //db.close();
});

// Make db accessible to router
app.use(function(req,res,next){
    //req.db = mongoconnect.getChatHistory();
    req.db = myDB;
    next();
});

app.use('/', routes);
app.use('/chathistory', chathistory);
//app.use('/test', test);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
