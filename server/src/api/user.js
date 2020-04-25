const lib = require('./../lib/user');

module.exports = {
    
    loginUser: function(data, next){
        return lib.loginUser(data, next);
    },

    registerUser: function(data, next){
        return lib.registerUser(data, next);
    }


}