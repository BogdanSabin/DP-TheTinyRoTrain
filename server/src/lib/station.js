const Model =require('./../../models').Station();

module.exports.createStation = function(data, next){
    let filter ={name: data.name};

    //check if already exists a station with this name
    return Model.findOne(filter, function(error,station){
        if(error)
            return next(error);
        if(!station){
            let newStation =new Model(data);
            newStation.save().then(()=>{
                return next(null, newStation);
            });
        }
        else
            return next('Collision');
    });
}