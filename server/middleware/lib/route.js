const api =require('./../../src/api/route');

module.exports = {
    createRoute: function(req, next) {
        let data = req.body;
        return api.createRoute(data, req.headers.authorization, next);
    },

    updateRoute: function(req, next){
        let data = {
            routeid: req.params.id,
            updateData: req.body
        }
        return api.updateRoute(data, req.headers.authorization, next);
    },

    getRouteByid: function(req, next){
        let routeid = req.params.id;
        return api.getRouteByid(routeid, req.headers.authorization, next);
    },

    getAllRoutes: function(req, next){
        let data = req.body;
        return api.getAllRoutes(data, req.headers.authorization, next);
    },

    deleteRouteByid: function(req, next){
        let routeid = req.params.id;
        return api.deleteRouteByid(routeid, req.headers.authorization, next);
    }
}