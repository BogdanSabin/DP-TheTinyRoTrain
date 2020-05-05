const api = require('./../../src/api/wagon');

module.exports = {
    createWagon: function(req, next) {
        let data = req.body;
        return api.createWagon(data, req.headers.authorization, next);
    },

    updateWagon: function(req, next){
        let data = {
            wagonid: req.params.id,
            updateData: req.body
        }
        return api.updateWagon(data, req.headers.authorization, next);
    },

    getWagonByid: function(req, next){
        let wagonid = req.params.id;
        return api.getWagonByid(wagonid, req.headers.authorization, next);
    },

    getAllWagons: function(req, next){
        let data = req.body;
        return api.getAllWagons(data, req.headers.authorization, next);
    },

    deleteWagonByid: function(req, next){
        let wagonid = req.params.id;
        return api.deleteWagonByid(wagonid, req.headers.authorization, next);
    },

    getAllTypes: function(req, next){
        return api.getAllTypes(req.headers.authorization, next);
    },

    getAllSeats: function(req, next){
        let wagonid = req.params.id;
        return api.getAllSeats(wagonid, req.headers.authorization, next);
    }
}