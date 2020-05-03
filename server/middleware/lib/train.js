const api =require('./../../src/api/train');

module.exports = {
    createTrain: function(req, next) {
        let data = req.body;
        return api.createTrain(data, req.headers.authorization, next);
    },

    updateTrain: function(req, next){
        let data = {
            trainId: req.params.id,
            updateData: req.body
        }
        return api.updateTrain(data, req.headers.authorization, next);
    },

    getTrain: function(req, next){
        let trainId = req.params.id;
        return api.getTrain(trainId, req.headers.authorization, next);
    },

    getAllTrains: function(req, next){
        let data = req.body;
        return api.getAllTrains(data, req.headers.authorization, next);
    },

    deleteTrain: function(req, next){
        let trainId = req.params.id;
        return api.deleteTrain(trainId, req.headers.authorization, next);
    }
}