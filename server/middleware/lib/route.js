const api =require('./../../src/api/route');

module.exports = {
    createRoute: function(req, next) {
        let data = req.body;
        return api.createRoute(data, next);
    },

    updateRoute: function(req, next){
        let data = {
            routeid: req.params.id,
            updateData: req.body
        }
        return api.updateRoute(data, next);
    },

    getRouteByid: function(req, next){
        let routeid = req.params.id;
        return api.getRouteByid(routeid, next);
    },

    getAllRoutes: function(req, next){
        let data = req.body;
        return api.getAllRoutes(data, next);
    },

    deleteRouteByid: function(req, next){
        let routeid = req.params.id;
        return api.deleteRouteByid(routeid, next);
    }
}