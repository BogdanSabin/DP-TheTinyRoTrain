const _ = require('lodash');
const Model = require('./../../models').Wagon();
const ModelTrain = require('./../../models').Train();

module.exports.wagonModel = Model;

module.exports.createFilter = function(data){
    return {name: data.name, totalSeatsNo: data.totalSeatsNo, type: data.type}
}

module.exports.responseFilter = function(data, next){
    if(_.isArray(data))
        return next(null, data.map(r => {
            return {
                _id: r._id,
                name: r.name,
                totalSeatsNo: r.totalSeatsNo,
                type: r.type,
                price: r.price
            }
        }));
    else
        return next(null, _.pick(data, 
            ['_id', 'name', 'totalSeatsNo', 'type', 'price'])) 
}

module.exports.responseWithTrain = function(data, next){
    if(_.isArray(data)){
        let response = [];
        data.forEach(d =>{
            response.push(addTrainToResponse(d));
        });
        return next(null, response);
    }
    else
        return next(null, addTrainToResponse(data));
}

module.exports.updateFilter = function(data){
    return {_id: data.wagonid };
}

module.exports.updateData = function(data, next){
    return next(null, data.updateData);
}

module.exports.getAllFilter = function(data){
    return data || {}   
}

module.exports.setAttachedFlag = function(id, value){
    return Model.updateData({_id: id}, {isAttached: value}).exec();
}

module.exports.getAllTypes = function(next){
    Model.getTypes(function(error, data){
        if(error)
            return next(serverErrors.InteralError(error));
        return next(null, data);
    });
}

function addTrainToResponse(data){
    if(data.isAttached){
        ModelTrain.findOne({wagons: data._id}, function(error, train){
            if(error)
                return {
                    error: error,
                    wagonid: data._id
                }
            
            data.attachededTo = {
                _id: train._id,
                name: train.name
            };
            return _.pick(data, 
                ['_id', 'name', 'totalSeatsNo', 'type', 'price', 'attachededTo']); 
        });
    }
    else
        return _.pick(data, 
            ['_id', 'name', 'totalSeatsNo', 'type', 'price']);
}
