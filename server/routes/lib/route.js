const router = require('express').Router();
const middleware = require('./../../middleware').route;
const helper = require('./helper');

router.post('/create', (req, res) =>{
    middleware.createRoute(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.post('/update/:id', (req, res) =>{
    middleware.updateRoute(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.get('/getRoute/:id', (req, res) =>{
    middleware.getRouteByid(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.get('/all', (req, res) =>{
    middleware.getAllRoutes(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.delete('/delete/:id', (req, res) =>{
    middleware.deleteRouteByid(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

module.exports = router;