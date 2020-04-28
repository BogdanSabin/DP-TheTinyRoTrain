const api = require('./../../src/api/wagon');

module.exports = {
    createWagon: function(req, next) {
        let data = req.body;
        return api.createWagon(data, next);
    },

    updateWagon: function(req, next){
        let data = {
            wagonid: req.params.id,
            updateData: req.body
        }
        return api.updateWagon(data, next);
    },

    getWagonByid: function(req, next){
        let wagonid = req.params.id;
        return api.getWagonByid(wagonid, next);
    },

    getAllWagons: function(req, next){
        let data = req.body;
        return api.getAllWagons(data, next);
    },

    deleteWagonByid: function(req, next){
        let wagonid = req.params.id;
        return api.deleteWagonByid(wagonid, next);
    }
}