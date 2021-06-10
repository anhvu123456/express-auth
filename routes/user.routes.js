var express = require('express');
var signinController = require('../controllers/signin.controller');

var router = express.Router();

router.get('/', function(req, res){
    res.render('index');
});

router.get('/signin',signinController.login);
router.post('/signin', signinController.postLogin);

module.exports = router;