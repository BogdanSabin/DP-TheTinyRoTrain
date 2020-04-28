const router = require('express').Router();
const middleware = require('./../../middleware').wagon;
const helper = require('./helper');

router.post('/create', (req, res) =>{
    middleware.createWagon(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.post('/update/:id', (req, res) =>{
    middleware.updateWagon(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.get('/getWagon/:id', (req, res) =>{
    middleware.getWagonByid(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.get('/all', (req, res) =>{
    middleware.getAllWagons(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.delete('/delete/:id', (req, res) =>{
    middleware.deleteWagonByid(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

module.exports = router;