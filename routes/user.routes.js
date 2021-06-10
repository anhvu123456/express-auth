var express = require('express');
var signinController = require('../controllers/signin.controller');
var signupController = require('../controllers/signupController');

var router = express.Router();

router.get('/', function(req, res){
    res.render('index');
});

router.get('/signin',signinController.login);
router.post('/signin', signinController.postLogin);
router.get('/signup', signupController.signup);
router.post('/signup', signupController.checkSignup, signupController.postSignup);

module.exports = router;