const Model =require('./../../models').Station();
const serverErrors = require('./error');
const _ = require('lodash');

module.exports.createStation = function(data, next){
    let filter ={name: data.name};

    //check if already exists a station with this name
    return Model.findOne(filter, function(error,station){
        if(error)
            return next(serverErrors.InteralError(error));
        if(!station){
            let newStation =new Model(data);
            newStation.save().then(()=>{
                return next(null, newStation);
            });
        }
        else
            return next(serverErrors.Collision());
    });

}

module.exports.updateStation = function(data, next){
    let filter={_id: data.stationId}

    Model.updateOne(filter, data.updateData, function(error, station){
        if(error)
            return next(error);
        if(!station)
            return next('No data found!');

        return next(null, station);
    });
}

module.exports.getStation = function(stationId, next){
    let filter = {_id: stationId}
    Model.findOne(filter, function(error, station){
        if(error)
            return next(error);
        if(!station)
            return next('No data found!');

        return next(null, _.pick(station, ['_id','name','timeToWait']));
    });

}

module.exports.getAllStations = function(data, next){
    let filter = data || {};
    Model.find(filter, function(error, stations){
        if(error)
            return next(error);
        if(!stations)
            return next('No data found!');

        return next(null, stations.map(s => {return{
            _id: s._id,
            name: s.name,
            timeToWait: s.timeToWait
        }}));
    });
}

module.exports.deleteStation = function(data, next){
    let filter ={_id: data};
    Model.deleteOne(filter, function(error, data){
        if(error)
            return next(error);

        return next(null, data);
    });
}