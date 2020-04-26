const jwt = require('jsonwebtoken');
const _ = require('lodash');
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

module.exports.updateUser = function(data, next){
    let filter = {_id: data.userid};
    Model.updateOne(filter, data.updateData, function(error, user){
        if(error)
            return next(error);
        if(!user)
            return next('No data found');
        return next(null, user);
    });
}

module.exports.deleteUser = function(data, next){
    Model.deleteOne({_id: data}, function(error, data){
        if(error)
            return next(error);
        return next(null, data);
    });
}

module.exports.getUser = function(data, next){
    Model.findOne({_id: data}, function(error, user){
        if(error)
            return next(error);
        if(!user)
            return next('No data found');
      
        return next(null, _.pick(user, ['_id', 'role', 'firstName', 'lastName', 'email']));
    });
}

module.exports.getAllUsers = function(data, next){
    let filter = data || {};
    Model.find(filter, function(error, users){
        if(error)
            return next(error);
        if(!users)
            return next('No data found');
        
        return next(null, users.map(u => {return {
            _id: u._id,
            role: u.role,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email
        }}));
    });
}

module.exports.makeAdmin = function(data, next){
    let updateData = {role: data.role}
    Model.updateOne({_id: data.userid}, updateData, function(error, data){
        if(error)
            return next(error);
      
        return next(null, data);
    });
}

module.exports.getUserRoles = function(next){
    Model.getRoles(function(error, data){
        if(error)
            return next(error);
        return next(null, data);
    });
}