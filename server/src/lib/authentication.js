const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Model = require('./../../models').User();
const crypter = require('./../crypter');
const serverErrors = require('./error');
const secretKey = require('./../../config/config').local.secret.auth;
const secretKeyEmail = require('./../../config/config').local.secret.email;
const notifier = require('./../notifier/notifier');
const config = require('./../../config/config').local.client;

module.exports.loginUser = function(data, next){
    let filter = {email: data.email};
    let password = data.password;
    return Model.findOne(filter, function(error, user){
        if(error)
            return next(serverErrors.InteralError(error));
        if(!user)
            return next(serverErrors.NodataFound());

        if(!user.emailConfirmation )
            return next(serverErrors.UnauthorizedError('email must be confirmed'));

        //check if passwords match
        if(password === crypter.decrypt(user.password)){
            let response = {
                role: user.role
            };
            //create token
            let payload = {subject: user._id};
            let token = jwt.sign(payload, secretKey, { expiresIn: '10h' });
            
            response.token = token;
            
            return next(null, response);
        }
       else
        return next(serverErrors.Unauthorized());
    });

}

module.exports.registerUser = function(data, next){
    let filter = {email: data.email};
    //check if already exists an user with this cresentials
    return Model.findOne(filter, function(error, user){
        if(error)
            return next(serverErrors.InteralError(error));
        if(!user){
            data.password = crypter.encrypt(data.password);
            let newUser = new Model(data);
            newUser.save().then(()=>{
                let tokenEemail = jwt.sign({subject: newUser._id}, secretKeyEmail, 
                    { expiresIn: '10h' });
                    
                notifier.sendConfirmationEmail(tokenEemail, newUser.email, function(error, info){
                    if(error){
                        //delete the new created user due to email error
                        Model.deleteOne({_id: options.id}, function(err, data){
                            if(err)
                                return next(serverErrors.InteralError(err));
                            return next(error);
                        });
                    }
                    return next(null,  _.pick(newUser, ['_id', 'role', 'firstName', 'lastName', 'email']));
                });
            });
        }
        else
            return next(serverErrors.Collision());
            
    });
}

module.exports.emailConfirmation = function(token, next){
    if(!token)
        return next(serverErrors.UnauthorizedError('Token missing'));

    try {
        let payload = jwt.verify(token, secretKeyEmail);
          
        if(!payload)
            return next(serverErrors.UnauthorizedError('Payload missing'));
        
        let userid = payload.subject;

        Model.updateOne({_id: userid}, {emailConfirmation: true}, function(error, mongores){
            if(error)
                return next(serverErrors.InteralError(error));

            if(mongores.nModified == 0)
                return next(serverErrors.NodataFound());
        
            let res = { 
                redirect: "http://" + config.hostname + ":" + config.port + "/login"  };
            return next(null, res);
        }); 


    }catch(error){
        console.log("Catch error: ", error);
        return next(serverErrors.InteralError(error));
    }
    
}