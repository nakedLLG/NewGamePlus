var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var GameModel = require('./public/data/gamesSchema');
var CategoryModel = require('./public/data/categorySchema');
var CartModel = require('./public/data/cartSchema');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

var routes = require('./routes/index');

// passport settings
require('./passport')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// required for passport
app.use(session({ secret: 'greatgames', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);

app.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});


require('./routes/route')(app, passport);

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

//mongoose.connect("mongodb://localhost:27017/brokercars");
//mongoose.connect("mongodb://soeren:123456@ds033734.mongolab.com:33734/brokercars", options);
var db = mongoose.connection;
mongoose.connect("mongodb://naked:naked2010@ds033123.mongolab.com:33123/gametest", options);
db.on("error", console.error);
db.once("open", function(callback){
  console.log("MongoDB connection established to gametest");
});

app.get('/cart/', function(req, res) {
  CartModel.find(function(err, data){
    if (err) {
      console.error(err);
    }
    res.json(data);
  })
});

app.post('/cart/', function(req, res) {
  CartModel.create(req.body, function(err, cart) {
    if (err) {
      console.error(err);
    } else {
      console.log(cart);
    }
  })
});

app.delete('/cart/:id', function(req, res) {
  var query = { '_id': req.params.id };
  CartModel.remove(query, function(err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log("deleted");
    }
  })
});

app.get('/categories/', function(req, res){
  CategoryModel.find(function(err, data){
    if (err) {
      console.error(err);
    }
    res.json(data);
  })
});

app.post("/categories/", function(req, res){
  var productData = req.body;
  var query = {'brands': req.body.id };
  var options = {new: true};
  CategoryModel.findOne(query, function(err, category) {
    console.log(productData);
    if (category != null) {
      category.brands.push(req.body.brands);
      category.save(function(err){
        if (!err) console.log('updated');
      });
    } else {
      CategoryModel.create(req.body, function(err, category) {
        if (err) {
          console.error(err);
        }
        console.log(category);
      })
    }
  })
});


app.get("/games/", function(req, res){
  GameModel.find(function(err, data){
    if(err){
      console.error(err);
    }
    res.json(data);
  });
});

app.get("/games/:id", function(req, res){
  GameModel.findOne({id: req.params.id }, function(err, data){
    if (err) {
      console.error(err);
    } else {
      res.json(data)
    }
  });
});

app.post("/games/", function(req, res){
  GameModel.create(req.body, function(err, car){
    if (err){
      console.error(err);
    }
  })
});

app.put('/games/:id', function(req, res){
  var productData = req.body;
  var query = {'id': req.params.id};
  var options = {new: true};
  GameModel.findOneAndUpdate(query, productData, options, function(err, response){
    if (err) {
      console.error(err);
    }
  });
});

app.delete('/games/:id', function(req, res){
  var query = { 'id': req.params.id };
  GameModel.remove(query, function(err){
    if (err) {
      console.error(err);
    }
  });
});


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
