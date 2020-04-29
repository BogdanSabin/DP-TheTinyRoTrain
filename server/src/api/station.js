const lib =require('./../lib/station');
const authorize = require('./../authorizator/autz').authorize;

module.exports = {

    createStation: function(data, token, next){
        return lib.createStation(data, next);
    },

    updateStation: function(data, token, next){
        return lib.updateStation(data,next);
    },
    
    getStation: function(data, token, next){
        return lib.getStation(data, next);
    },

    getAllStations: function(data, token, next){
        return lib.getAllStations(data, next);
    },

    deleteStation: function(data, token, next){
        return lib.deleteStation(data,next);
    }

}