const jwt = require('jsonwebtoken');
const secretKeyAutz = require('./../../config/config').local.secret.auth;
const secretKeyEmail = require('./../../config/config').local.secret.email;
const serverError = require('./../lib/error');
const ModelUser = require('./../lib/user').userModel;

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

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
          
          console.log("Playload: ", payload);
          let userid = payload.subject;
      
          ModelUser.findById(userid, function(error, user){
              if(error)
                  return next(serverError.InteralError(error));
              if(!user)
                  return next(serverError.NodataFound());
              if(user.role == role || user.role == 'master')
                  return next(null, true);
              else
                  return next(serverError.UnauthorizedError('role ' + user.role + ' need role ' + role));  
          });

    }catch(error){
      return next(serverError.InteralError(error))
    }
  }