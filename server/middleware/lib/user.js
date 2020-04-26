const api = require('./../../src/api/user');

module.exports = {
    
    loginUser: function(req, next){
        let data = {
            email: req.body.email,
            password: req.body.password
        }
        return api.loginUser(data, next);
    },

    registerUser:function(req, next){
        let data = req.body;
        return api.registerUser(data, next);
    },

    updateUser: function(req, next){
        let data = {
            updateData: req.body,
            userid: req.params.id
        }
        return api.updateUser(data, next);

    },

    deleteUser: function(req, next){
        let userid = req.params.id;
        return api.deleteUser(userid, next);
    },

    getUser:function(req, next){
        let userid = req.params.id;
        return api.getUser(userid, next);
    },

    getAllUsers: function(req, next){
        let data = req.body;
        return api.getAllUsers(data, next);
    },

    changerole: function(req, next){
        let data = {
            userid: req.params.id,
            role: req.params.role
        }
        return api.makeAdmin(data, next);
    },

    getUserRoles: function(req, next){
        return api.getUserRoles(next);
    }


}
