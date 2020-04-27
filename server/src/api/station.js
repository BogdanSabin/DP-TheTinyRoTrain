const lib =require('./../lib/station');

module.exports = {

    createStation: function(data, next){
        return lib.createStation(data, next);
    },

    updateStation: function(data, next){
        return lib.updateStation(data,next);
    },
    
    getStation: function(data, next){
        return lib.getStation(data, next);
    },

    getAllStations: function(data, next){
        return lib.getAllStations(data, next);
    },

    deleteStation: function(data, next){
        return lib.deleteStation(data,next);
    }

}