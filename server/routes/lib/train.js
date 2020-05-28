const router = require('express').Router();
const middleware = require('./../../middleware').train;
const helper = require('./helper');

router.post('/create', (req, res) =>{
    middleware.createTrain(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.post('/update/:id', (req, res) =>{
    middleware.updateTrain(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.get('/getTrain/:id', (req, res) =>{
    middleware.getTrain(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.get('/all', (req, res) =>{
    middleware.getAllTrains(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.delete('/delete/:id', (req, res) =>{
    middleware.deleteTrain(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

module.exports = router;