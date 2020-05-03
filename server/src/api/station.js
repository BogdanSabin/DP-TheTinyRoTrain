const lib =require('./../lib/station');
const authorize = require('./../authorizator/autz').authorize;
const helper = require('./../lib/helper');

module.exports = {

    createStation: function(data, token, next){
        return authorize(token, 'admin', function (error,ok){
            if(error)
                return next(error);
            if(ok)
                return helper.createResource({
                    data: data,
                    Model: lib.stationModel,
                    createFilter: lib.createFilter(data),
                    responseFilter: lib.responseFilter
                },next);
        });
    },

    updateStation: function(data, token, next){
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.updateResource({
                    data: data,
                    Model: lib.stationModel,
                    updateFilter: lib.updateFilter(data),
                    updateData: lib.updateData
                }, next);
        });
    },
    
    getStation: function(stationId, token, next){
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.getResourceByid({
                    id: stationId,
                    Model: lib.stationModel,
                    responseFilter: lib.responseFilter
                }, next);
        });
    },

    getAllStations: function(data, token, next){
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.getAllResources({
                    Model: lib.stationModel,
                    getAllFilter: lib.getAllFilter(data),
                    responseFilter: lib.responseFilter
                }, next);
        });
    },

    deleteStation: function(stationId, token, next){
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.deleteResourceByid({
                    id: stationId,
                    Model: lib.stationModel
                }, next);
        });
    }

}