const router = require('express').Router();
const middlewate = require('./../../middleware').user;
const helper = require('./helper');

router.post('/update/:id', (req, res) =>{
    middlewate.updateUser(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
     });
});

router.delete('/delete/:id', (req, res) =>{
    middlewate.deleteUser(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
     });
});

router.post('/change/:role/:id', (req, res) =>{
    middlewate.changerole(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
     });
});

router.get('/getone/:id', (req, res) =>{
    middlewate.getUser(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
     });
});

router.get('/all', (req, res) =>{
    middlewate.getAllUsers(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
     });
});

router.get('/roles', (req, res) =>{
    middlewate.getUserRoles(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
     });
});


module.exports = router;