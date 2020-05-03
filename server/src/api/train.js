const lib = require('./../lib/train ');
const helper = require('./../lib/helper');
const authorize = require('./../authorizator/autz').authorize;

module.exports = {
    createRoute: function (data, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.createResource({
                    data: data,
                    Model: lib.routeModel,
                    createFilter: lib.createFilter(data),
                    responseFilter: lib.resposeFilter
                }, next);
        });
    },

    updateRoute: function (data, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.updateResource({
                    data: data,
                    Model: lib.routeModel,
                    updateFilter: lib.updateFilter(data),
                    updateData: lib.updateData
                }, next);
        });
    },

    getRouteByid: function (routeid, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.getResourceByid({
                    id: routeid,
                    Model: lib.routeModel,
                    responseFilter: lib.resposeFilter
                }, next);
        });
    },

    getAllRoutes: function (data, token, next) {
        return authorize(token, 'admin', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return helper.getAllResources({
                    Model: lib.routeModel,
                    getAllFilter: lib.getAllFilter(data),
                    responseFilter: lib.resposeFilter
                }, next);
        });
    },

    deleteRouteByid: function (routeid, token, next) {
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