const router = require('express').Router();

router.post('/register', (req, res) =>{
    res.status(200).send("User register ");
});

router.post('/login', (req, res) =>{
    res.status(200).send("User log in");
});

router.post('/update/:id', (req, res) =>{
    res.status(200).send("User update");
});

router.post('/delete/:id', (req, res) =>{
    res.status(200).send("User  in");
});

router.post('/make/admin/:id', (req, res) =>{
    res.status(200).send("User log in");
});

router.post('/getone/:id', (req, res) =>{
    res.status(200).send("user get one by id ");
});

router.get('/all', (req, res) =>{
    res.status(200).send("users get all ");
});



module.exports = router;