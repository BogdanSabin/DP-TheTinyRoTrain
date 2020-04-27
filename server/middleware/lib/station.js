const api =require('./../../src/api/station');

module.exports ={
    createStation: function(req, next){
        let data = req.body;
        return api.createStation(data,next);
    },

    updateStation: function(req, next){
        let data ={
            updateData: req.body,
            stationId: req.params.id
        }
        return api.updateStation(data, next);
    },

    getStation: function(req, next){
        let stationId = req.params.id;
        return api.getStation(stationId, next);
    },

    getAllStations: function(req, next){
        let data = req.body;
        return api.getAllStations(data, next);
    },

    deleteStation: function(req, next){
        let data = req.params.id;
        return api.deleteStation(data, next);
    }
}