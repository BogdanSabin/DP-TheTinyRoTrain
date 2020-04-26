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
    middlewate.updateUser(req, function(error, serverRes){
        if(error)
            res.status(500).send(error);  
        else
            res.status(200).send(serverRes);
     });
});

router.post('/delete/:id', (req, res) =>{
    middlewate.deleteUser(req, function(error, serverRes){
        if(error)
            res.status(500).send(error);  
        else
            res.status(200).send(serverRes);
     });
});

router.post('/change/:role/:id', (req, res) =>{
    middlewate.changerole(req, function(error, serverRes){
        if(error)
            res.status(500).send(error);  
        else
            res.status(200).send(serverRes);
     });
});

router.get('/getone/:id', (req, res) =>{
    middlewate.getUser(req, function(error, serverRes){
        if(error)
            res.status(500).send(error);  
        else
            res.status(200).send(serverRes);
     });
});

router.get('/all', (req, res) =>{
    middlewate.getAllUsers(req, function(error, serverRes){
        if(error)
            res.status(500).send(error);  
        else
            res.status(200).send(serverRes);
     });
});

router.get('/roles', (req, res) =>{
    middlewate.getUserRoles(req, function(error, serverRes){
        if(error)
            res.status(500).send(error);  
        else
            res.status(200).send(serverRes);
     });
});


module.exports = router;