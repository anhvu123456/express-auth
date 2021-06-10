require('dotenv').config;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var app = express();
require('./config/passport');


mongoose.connect('mongodb://localhost/express-auth',{ useNewUrlParser: true, useUnifiedTopology: true}, err => {
    if(err) throw err;
    console.log('Connect successfullyy!!');
});

app.use(session({
    secret: 'adsa897adsa98bs',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

var userRouter = require('./routes/user.routes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next){
    next(createError(404));
});

//error handler
app.use(function(err, req, res, next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000);
module.exports = app;