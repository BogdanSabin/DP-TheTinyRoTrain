const api =require('./../../src/api/station');

module.exports ={
    createStation: function(req, next){
        let data = req.body;
        return api.createStation(data, req.headers.authorization,next);
    },

    updateStation: function(req, next){
        let data ={
            updateData: req.body,
            stationId: req.params.id
        }
        return api.updateStation(data, req.headers.authorization, next);
    },

    getStation: function(req, next){
        let stationId = req.params.id;
        return api.getStation(stationId, req.headers.authorization, next);
    },

    getAllStations: function(req, next){
        let data = req.body;
        return api.getAllStations(data, req.headers.authorization, next);
    },

    deleteStation: function(req, next){
        let stationId = req.params.id;
        return api.deleteStation(stationId, req.headers.authorization, next);
    }
}