const _ = require('lodash');
const Model = require('./../../models').User();
const serverErrors = require('./error');

module.exports.userModel = Model;

module.exports.updateFilter = function(data){
    return {_id: data.userid };
}

module.exports.updateData = function(data, next){
    let updateData = data.updateData;
    Model.findOne({_id: data.userid}, function(error, user){
        if(error)
            return next(serverErrors.InteralError(error));
        if(!user)
            return next(serverErrors.NodataFound());
        
        updateData.role = user.role; 
        updateData.password = user.password;
        updateData.emailConfirmation = user.emailConfirmation ? user.emailConfirmation : false;
        
        return next(null, updateData);
    });
}

module.exports.responseFilter = function(data, next){
    if(_.isArray(data))
        return next(null, data.map(u => {
            return {
                _id: u._id,
                role: u.role,
                firstName: u.firstName,
                lastName: u.lastName,
                email: u.email
            }
        }));
    else
    return next(null, _.pick(data, 
        ['_id', 'role', 'firstName', 'lastName', 'email']))
}

module.exports.getAllFilter = function(data){
    return data || {}   
}

module.exports.makeAdmin = function(data, next){
    let updateData = {role: data.role}
    Model.updateOne({_id: data.userid}, updateData, function(error, data){
        if(error)
            return next(serverErrors.InteralError(error));
      
        return next(null, data);
    });
}

module.exports.getUserRoles = function(next){
    Model.getRoles(function(error, data){
        if(error)
            return next(serverErrors.InteralError(error));
        return next(null, data);
    });
}