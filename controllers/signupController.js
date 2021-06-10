var express = require('express');
const { check, validationResult} = require('express-validator');
var passport = require('passport');

module.exports.signup = function(req, res, next){
    var messages = req.flash('error');
    res.render('signup', {
        messages: messages,
        hasErrors: messages.length > 0
    })
};


module.exports.postSignup = passport.authenticate('local.signup', { successRedirect: '/signin',
                                            failureRedirect: '/signup',
                                            failureFlash: true })
    


module.exports.checkSignup = function(req, res, next){
    [
        check('email', 'Your email is not valid').isEmail(),
        check('password', 'Your password must be at least 5 characters').isLength({ min: 5})
    ];

    var  messages = req.flash('error');
    const result = validationResult(req);
    var errors = result.errors;
    if(!result.isEmpty()){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        res.render('signup', {
            messages: messages,
            hasErrors: messages.length > 0
        })
    }else{
        next();
    };
 
};

