const router = require('express').Router();
const middleware = require('./../../middleware').station;

router.post('/create', (req, res) =>{
    middleware.createStation(req, function(error, serverRes){
        if(error)
            res.status(500).send(error);
        else
            res.status(200).send(serverRes);
    });
});

router.post('/update/:id', (req, res) =>{
    res.status(200).send("station update");
});

router.get('/getStation/:id', (req, res) =>{
    res.status(200).send("station get by id " + req.params.id);
});

router.get('/all', (req, res) =>{
    res.status(200).send("get stations all");
});

router.delete('/delete/:id', (req, res) =>{
    res.status(200).send("station delete by id " + req.params.id);
});

module.exports = router;