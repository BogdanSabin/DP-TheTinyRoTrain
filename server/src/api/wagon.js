const lib = require('./../lib/wagon');
const helper = require('./../lib/helper');
const authorize = require('./../authorizator/autz').authorize;

module.exports = {
    createWagon: function (data, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return lib.createWagon(data, next);
        });
    },

    updateWagon: function (data, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return lib.updateWagon(data, next);
        });
    },

    getWagonByid: function (routeid, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return lib.getWagonByid(routeid, next);
        });
    },

    getAllWagons: function (data, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return lib.getAllWagons(data, next);
        });
    },

    deleteWagonByid: function (routeid, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return lib.deleteWagonByid(routeid, next);
        });
    }
}