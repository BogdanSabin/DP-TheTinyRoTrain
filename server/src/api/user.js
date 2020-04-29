const lib = require('./../lib/user');
const helper = require('./../lib/helper');
const authorize = require('./../authorizator/autz').authorize;

module.exports = {
    updateUser: function (data, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.updateResource({
                    data: data,
                    Model: lib.userModel,
                    updateFilter: lib.updateFilter(data),
                    updateData: lib.updateData
                }, next);
        });
    },

    deleteUser: function (userid, token, next) {
        return authorize(token, 'master', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.deleteResourceByid({
                    id: userid,
                    Model: lib.userModel
                }, next);
        });
    },

    getUser: function (userid, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.getResourceByid({
                    id: userid,
                    Model: lib.userModel,
                    responseFilter: lib.responseFilter
                }, next);
        });
    },

    getAllUsers: function (data, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.getAllResources({
                    Model: lib.userModel,
                    getAllFilter: lib.getAllFilter(data),
                    responseFilter: lib.responseFilter
                }, next);
        });
    },

    makeAdmin: function (data, token, next) {
        return authorize(token, 'master', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                if (data.role == "master")
                    return next('Forbidden');
            return lib.makeAdmin(data, next);
        });
    },

    getUserRoles: function (token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return lib.getUserRoles(next);
        });
    }


}