var passport= require('passport');
var User = require('../models/user.model');
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user, done){
    done(null, user.id);
})

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    })
});


// local sign-in
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    User.findOne({ 'email': email }, function(err, user){
        if(err) { return done(err)};
        console.log(user);
        if(!user){
            return done(null, false, { messages: ' Not uer found'})
        }
        if(!user.validPassword(password)){
            return done(null, false, { messages: 'Wrong password'})
        }
        return done(null, user);
    });
}));