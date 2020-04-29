const api = require('./../../src/api/authentication');

module.exports = {
    loginUser: function(req, next){
        let data = {
            email: req.body.email,
            password: req.body.password
        }
        return api.loginUser(data, next);
    },

    registerUser: function(req, next){
        let data = req.body;
        return api.registerUser(data, next);
    },

    emailConfirmation: function(req, next){
        let token = req.params.token;
        return api.emailConfirmation(token, next);
    } 
}