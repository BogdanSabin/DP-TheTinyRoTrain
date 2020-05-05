const jwt = require('jsonwebtoken');
const secretKeyAutz = require('./../../config/config').local.secret.auth;
const secretKeyEmail = require('./../../config/config').local.secret.email;
const serverError = require('./../lib/error');
const ModelUser = require('./../lib/user').userModel;

module.exports.authorize = function(token, role, next){
    if(!token)
        return next(serverError.UnauthorizedError('Token missing'));
    
    token = token.split(' ')[1];
    
    if(token == 'null')
        return next(serverError.UnauthorizedError('Token missing'));
    try {
          let payload = jwt.verify(token, secretKeyAutz);
          
          if(!payload)
              return next(serverError.UnauthorizedError('Payload missing'));
          
          let userid = payload.subject;
      
          ModelUser.findById(userid, function(error, user){
              if(error)
                  return next(serverError.InteralError(error));
              if(!user)
                  return next(serverError.UnauthorizedError(' No user found based on token'));
              if(checkRole(user.role, role))
                  return next(null, true);
              else
                  return next(serverError.UnauthorizedError('role ' + user.role + ' need role ' + role));  
          });

    }catch(error){
      return next(serverError.InteralError(error))
    }
  }

function checkRole(userRole, autzRole){
    //only admin and master
    if(userRole == autzRole || userRole == 'master')
        return true;

    //all registred users
    if(userRole == autzRole || userRole == 'admin')
        return true;

    return false;

}