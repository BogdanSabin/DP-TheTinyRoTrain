const _ = require('lodash');
const Model = require('./../../models').Train();

module.exports.routeModel = Model;

module.exports.createFilter = function(data){
    return { 
        name: data.name, 
        route: data.route, 
        wagons: data.wagons }
}

module.exports.resposeFilter = function(data, next){
    if(_.isArray(data))
        return next(null, data.map(r => {
            return {
                _id: r._id,
                name: r.name,
                departureDate: r.departureDate,
                arrivalDate: r.arrivalDate,
                stations: r.stations
            }
        }));
    else
    return next(null, _.pick(data, 
        ['_id', 'name', 'departureDate', 'arrivalDate', 'stations']))
}

module.exports.updateFilter = function(data){
    return {_id: data.routeid };
}

module.exports.updateData = function(data, next){
    return next(null, data.updateData);
}

module.exports.getAllFilter = function(data){
    return data || {}   
}