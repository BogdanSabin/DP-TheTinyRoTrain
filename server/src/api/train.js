const lib = require('./../lib/train');
const helper = require('./../lib/helper');
const authorize = require('./../authorizator/autz').authorize;

module.exports = {
    createTrain: function (data, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.createResource({
                    data: data,
                    Model: lib.trainModel,
                    createFilter: lib.createFilter(data),
                    responseFilter: lib.resposeFilter
                }, next);
        });
    },

    updateTrain: function (data, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.updateResource({
                    data: data,
                    Model: lib.trainModel,
                    updateFilter: lib.updateFilter(data),
                    updateData: lib.updateData
                }, next);
        });
    },

    getTrain: function (routeid, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.getResourceByid({
                    id: routeid,
                    Model: lib.trainModel,
                    responseFilter: lib.resposeFilter
                }, next);
        });
    },

    getAllTrains: function (data, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.getAllResources({
                    Model: lib.trainModel,
                    getAllFilter: lib.getAllFilter(data),
                    responseFilter: lib.resposeFilter
                }, next);
        });
    },

    deleteTrain: function (routeid, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.deleteResourceByid({
                    id: routeid,
                    Model: lib.routeModel
                }, next);
        });
    }
}