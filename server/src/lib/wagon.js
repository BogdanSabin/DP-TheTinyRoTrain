const Model = require('./../../models').Wagon();
const ModelTrein = require('./../../models').Train();

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

    }
    else {
        
    }
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

// module.exports.createWagon = function(data, next){
//    let filter = {name: data.name, totalSeatsNo: data.totalSeatsNo, type: data.type}
//    Model.findOne(filter, function(error, wagon){
//        if(error)
//         return next(serverError.InteralError(error));
//        if(wagon)
//         return next(serverError.Collision);
//         data.seats = [];
//         for(let i = 0; i < data.totalSeatsNo; i++)
//             data.seats[i] = false;
//        let newWagon = new Model(data);
//        newWagon.save().then(() => {
//         return next(null, _.pick(newWagon, 
//             ['_id', 'name', 'totalSeatsNo', 'type', 'price'])) 
//        })
    
//    })
// }

// module.exports.updateWagon = function(data, next){
//     let filter = {_id: data.wagonid };
//     let updateData = data.updateData;
   
//     Model.updateOne(filter, updateData, function(error, data){
//         if(error)
//             return next(serverErrors.InteralError(error));
//         return next(null, data);
//     });
// }

// module.exports.getWagonByid = function(routeid, next){
   
// }

// module.exports.getAllWagons = function(data, next){
    
// }

// module.exports.deleteWagonByid = function(routeid, next){
    
// }