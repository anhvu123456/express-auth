var express = require('express');
const { check, validationResult} = require('express-validator');
var passport = require('passport');

module.exports.login = function(req, res, next){
    var messages = req.flash('error');
    res.render('signin', {
        messages: messages,
        hasErrors: messages.length > 0
    })
};

module.exports.postLogin = 
    passport.authenticate('local.signin', { successRedirect: '/',
                                        failureRedirect: '/signin',
                                        failureFlash: true});

