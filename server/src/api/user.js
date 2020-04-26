const lib = require('./../lib/user');

module.exports = {
    
    loginUser: function(data, next){
        return lib.loginUser(data, next);
    },

    registerUser: function(data, next){
        return lib.registerUser(data, next);
    },

    updateUser:function(data, next){
        return lib.updateUser(data, next);
    },

    deleteUser: function(data, next){
        return lib.deleteUser(data, next);
    },

    getUser: function(data, next){
        return lib.getUser(data, next);
    },

    getAllUsers: function(data, next){
        return lib.getAllUsers(data, next);
    },

    makeAdmin: function(data, next){
        if(data.role == "master")
            return next('Forbidden');
        return lib.makeAdmin(data, next);
    },

    getUserRoles: function(next){
        return lib.getUserRoles(next);
    }


}