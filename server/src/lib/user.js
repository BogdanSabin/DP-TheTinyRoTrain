const jwt = require('jsonwebtoken');
const Model = require('./../../models').User();
const crypter = require('./../crypter');

module.exports.loginUser = function(data, next){
    let filter = {email: data.email};
    let password = data.password;
    return Model.findOne(filter, function(error, user){
        if(error)
            return next(error);
        if(!user)
            return next('Not Found');

        //check if passwords match
        if(password === crypter.decrypt(user.password)){
            let response = {
                role: user.role
            };
            //create token
            let payload = {subject: user._id};
            let token = jwt.sign(payload, 'secretKey');
            
            response.token = token;
            
            return next(null, response);
        }
       else
        return next('Forbidden');
    });

}

module.exports.registerUser = function(data, next){
    let filter = {email: data.email};

    //check if already exists an user with this cresentials
    return Model.findOne(filter, function(error, user){
        if(error)
            return next(error);
        if(!user){
            data.password = crypter.encrypt(data.password);
            let newUser = new Model(data);
            newUser.save().then(()=>{
                return next(null, newUser);
            });
        }
        else
            return next('Collision');
            
    });
}