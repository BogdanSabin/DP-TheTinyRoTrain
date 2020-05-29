const _ = require('lodash');
const Promise = require('bluebird');
const Model = require('./../../models').Wagon();
const ModelTrain = require('./../../models').Train();
const serverErrors = require('./error');

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

module.exports.attachedToTrain = function(data, next){
   let wagons = data.wagons;
   let trainid = data._id;
   let workflow = new Promise((resolve, reject) =>{
        wagons.forEach((wagonid, i, array) => {
            let filter = {_id: wagonid};
            let updateData = {attachedTo: trainid};
            Model.updateOne(filter, updateData, function(error, data){
                if(error)
                    reject(error);
                else
                    if(i == array.length - 1)
                        resolve();
            });
        });
   });

   workflow.then(()=>{
       return next(null, true);
   })
   .catch((reason) =>{
       return next(reason);
   })

    //return Model.updateData({_id: id}, {isAttached: value}).exec();
}

module.exports.getAllTypes = function(next){
    Model.getTypes(function(error, data){
        if(error)
            return next(serverErrors.InteralError(error));
        return next(null, data);
    });
}

module.exports.getAllSeats = function(wagonid, next){
    let response = {
        freeSeats: [],
        occupiedSeats: []
    };
    Model.findOne({_id: wagonid}, function(error, wagon){
        if(error)
            return next(serverErrors.InteralError(error));
        
        if(!wagon || !wagon.seats )
            return next(serverErrors.NodataFound());
        
        let name = wagon.name;
        wagon.seats.forEach((s, i) =>{
            if(s)
                response.freeSeats.push(name + '_S' + (i +1));
            else
                response.occupiedSeats.push(name + '_S' + (i +1));
        });
        return next(null, response);
    });

}

module.exports.seatReservation = function(seatsReserved, wagonid, next){
    //seats = ["wagonName_S1", "wagonName_S2", "wagonName_S3"]
    //subtract 1 because of the array representation seats[0] is acctualy seat1 
    let positions  = seatsReserved.map(s => {return parseInt(s.split('_')[1].substring(1),10) - 1 });
    Model.findOne({_id: wagonid}, function(error, wagon){
        if(error)
            return next(serverErrors.InteralError(error));
    
        if(!wagon || !wagon.seats )
            return next(serverErrors.NodataFound());

        positions.forEach(p =>{
            wagon.seats[p] = false;
        });
        wagon.freeSeatsNo = wagon.freeSeatsNo - positions.length;
        wagon.markModified('seats');
    
        wagon.save().then(()=>{
            return next(null, positions);
        })
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
