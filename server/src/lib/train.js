const _ = require('lodash');
const Model = require('./../../models').Train();

module.exports.trainModel = Model;

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
                wagons: r.wagons,
                route: r.route
            }
        }));
    else
    return next(null, _.pick(data, 
        ['_id', 'name', 'wagons','route']))
}

module.exports.resposeFilterGet = function(data, next){
    if(_.isArray(data))
        return next(null, data.map(r => {
            return {
                _id: r._id,
                name: r.name,
                wagons: r.wagons.map( w => {return w.name}),
                route: r.route.name
            }
        }));
    else {
        return next(null, _.pick(data, 
            ['_id', 'name', 'wagons','route']))
        }
}

module.exports.updateFilter = function(data){
    return {_id: data.trainId };
}

module.exports.updateData = function(data, next){
    return next(null, data.updateData);
}

module.exports.getAllFilter = function(data){
    return data || {}   
}

module.exports.populate = function(docs, next){
    if(_.isArray(docs)){
        Model.find({})
        .populate('wagons', 'name -_id')
        .populate('route', 'name -_id')
        .exec(function(error, data){
            if(error)
                return next(error);
            else
                return next(null, data);
        })
    }
    else
        Model.findOne({_id: docs._id})
            .populate('wagons', 'name -_id')
            .populate('route', 'name -_id')
            .exec(function(error, data){
                if(error)
                    return next(error);
                else 
                    return next(null, data);
            })
}