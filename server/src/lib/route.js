const _ = require('lodash');
const Model = require('./../../models').Route();
const serverErrors = require('./error');

module.exports.createRoute = function(data, next){
    let filter = { name: data.name, 
        departureDate: data.departureDate, 
        arrivalDate: data.arrivalDate,
        stations: data.stations }
    console.log(filter);
    Model.findOne(filter, function(error, route){
        if(error)
            return next(serverErrors.InteralError(error));
        
        if(route)
            return next(serverErrors.Collision());
        
        let newRoute = new Model(data);
        newRoute.save().then(() => { return next(null, _.pick(newRoute, 
            ['_id', 'name', 'departureDate', 'arrivalDate', 'stations']))});
    });
}

module.exports.updateRoute = function(data, next){
    let filter = {_id: data.routeid };
    let updateData = data.updateData;
   
    Model.updateOne(filter, updateData, function(error, data){
        if(error)
            return next(serverErrors.InteralError(error));
        return next(null, data);
    });
}

module.exports.getRouteByid = function(routeid, next){
    Model.findOne({_id: routeid}, function(error, route){
        if(error)
            return next(serverErrors.InteralError(error));
        if(!route)
            return next(serverErrors.NodataFound());
        return next(null, _.pick(route, ['_id', 'name', 'departureDate', 'arrivalDate', 'stations']));
    });
}

module.exports.getAllRoutes = function(data, next){
    let filter = data || {};
    Model.find(filter, function(error, routes){
        if(error)
            return next(serverErrors.InteralError(error));
        if(!routes)
            return next(serverErrors.NodataFound());
        return next(null, routes.map(r => {
            return {
                _id: r._id,
                name: r.name,
                departureDate: r.departureDate,
                arrivalDate: r.arrivalDate,
                stations: r.stations
            }
        }))
    });
}

module.exports.deleteRouteByid = function(routeid, next){
    Model.deleteOne({_id: routeid}, function(error, data){
        if(error)
            return next(serverErrors.InteralError(error));
        return next(null, data);
    });
}