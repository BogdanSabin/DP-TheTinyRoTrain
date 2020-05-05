const lib = require('./../lib/wagon');
const helper = require('./../lib/helper');
const authorize = require('./../authorizator/autz').authorize;

module.exports = {
    createWagon: function (data, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
               return helper.createResource({
                    data: data,
                    Model: lib.wagonModel,
                    createFilter: lib.createFilter(data),
                    responseFilter: lib.responseFilter
                }, next);
        });
    },

    updateWagon: function (data, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.updateResource({
                    data: data,
                    Model: lib.wagonModel,
                    updateFilter: lib.updateFilter(data),
                    updateData: lib.updateData

                }, next);
        });
    },

    getWagonByid: function (wagonid, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.getResourceByid({
                    id: wagonid,
                    Model: lib.wagonModel,
                    responseFilter: lib.responseWithTrain
                },next);
        });
    },

    getAllWagons: function (data, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.getAllResources({
                    Model: lib.wagonModel,
                    getAllFilter: lib.getAllFilter(data),
                    responseFilter: lib.responseWithTrain
                }, next);
        });
    },

    deleteWagonByid: function (wagonid, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.deleteResourceByid({
                    id: wagonid,
                    Model: lib.wagonModel
                }, next);
        });
    },

    getAllTypes: function(token, next){
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
               return lib.getAllTypes(next);
        });
    }
}