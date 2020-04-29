const router = require('express').Router();
const middlewate = require('./../../middleware').authentication;
const helper = require('./helper');

router.post('/register', (req, res) =>{
    middlewate.registerUser(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
     });
});

router.post('/login', (req, res) =>{
    middlewate.loginUser(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.post('/confirmation/:token', (req, res) =>{
    middlewate.loginUser(req, function(error, serverRes){
        helper.redirect(res, error, serverRes);
    });
});


module.exports = router;