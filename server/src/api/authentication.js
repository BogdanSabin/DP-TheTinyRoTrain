const lib = require('./../lib/authentication');

module.exports = {
    loginUser: function (data, next) {
        return lib.loginUser(data, next);
    },

    registerUser: function (data, next) {
        if (data.role != 'user')
            data.role = 'user'
        return lib.registerUser(data, next);
    },

    emailConfirmation: function(token, next){
        return lib.emailConfirmation(token, next);
    }
}