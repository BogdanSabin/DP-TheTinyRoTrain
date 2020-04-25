const router = require('express').Router();
const middlewate = require('./../../middleware').user;

router.post('/register', (req, res) =>{
    middlewate.registerUser(req, function(error, serverRes){
        if(error)
            res.status(500).send(error);  
        else
            res.status(200).send(serverRes);
     });
});

router.post('/login', (req, res) =>{
    middlewate.loginUser(req, function(error, serverRes){
        if(error == 'Not Found')
            res.status(404).send({});
        else
            if(error == 'Forbidden')
                res.status(403).send({});
             else
                if(error)
                    res.status(500).send();
        
                else
                    res.status(200).send(serverRes);
    });
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