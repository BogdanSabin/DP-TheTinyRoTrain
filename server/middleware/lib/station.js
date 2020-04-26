const api =require('./../../src/api/station');

module.exports ={
    createStation: function(req, next){
        let data = req.body;
        return api.createStation(data,next);
    }
}