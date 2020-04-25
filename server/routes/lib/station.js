const router = require('express').Router();

router.post('/create', (req, res) =>{
    res.status(200).send("station create ");
});

router.post('/update/:id', (req, res) =>{
    res.status(200).send("station update");
});

router.get('/getone/:id', (req, res) =>{
    res.status(200).send("station getone by id " + req.params.id);
});

router.get('/all', (req, res) =>{
    res.status(200).send("stations all get");
});

router.delete('/delete/:id', (req, res) =>{
    res.status(200).send("station delete by id " + req.params.id);
});

module.exports = router;