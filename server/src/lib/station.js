const Model =require('./../../models').Station();
const serverErrors = require('./error');
const _ = require('lodash');

module.exports.stationModel = Model;

module.exports.createFilter = function(data, next){
    return {
        name: data.name,
        timeToWait: data.timeToWait
    }
    
}

module.exports.responseFilter = function(data, next){
    if(_.isArray(data))
        return next(null, data.map(r => {
            return{
                _id: r._id,
                name: r.name,
                timeToWait: r.timeToWait
            }
        }));
    else
    return next(null, _.pick(data,
        ['_id','name','timeToWait']));
}

module.exports.updateFilter = function(data){
    return {_id: data.stationId };
}

module.exports.updateData = function(data, next){
    return next(null, data.updateData);
}

module.exports.getAllFilter = function(data){
    return data || {}   
}