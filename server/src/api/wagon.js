const lib = require('./../lib/wagon');

module.exports = {
    createWagon: function(data, next) {
        return lib.createWagon(data, next);        
    },

    updateWagon: function(data, next){
        return lib.updateWagon(data, next);
    },

    getWagonByid: function(routeid, next){
        return lib.getWagonByid(routeid, next);
    },

    getAllWagons: function(data, next){
        return lib.getAllWagons(data, next);
    },

    deleteWagonByid: function(routeid, next){
        return lib.deleteWagonByid(routeid, next);
    }
}