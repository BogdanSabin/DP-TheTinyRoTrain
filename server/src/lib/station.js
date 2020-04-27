const Model =require('./../../models').Station();
const serverErrors = require('./error');

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