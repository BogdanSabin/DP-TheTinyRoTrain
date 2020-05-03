const router = require('express').Router();
const middleware = require('./../../middleware').station;
const helper = require('./helper');

router.post('/create', (req, res) =>{
    middleware.createStation(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.post('/update/:id', (req, res) =>{
   middleware.updateStation(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
   });
});

router.get('/getStation/:id', (req, res) =>{
    middleware.getStation(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.get('/all', (req, res) =>{
    middleware.getAllStations(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.delete('/delete/:id', (req, res) =>{
    middleware.deleteStation(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

module.exports = router;