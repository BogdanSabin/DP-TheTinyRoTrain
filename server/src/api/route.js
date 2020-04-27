const lib =require('./../lib/route');

module.exports = {
    createRoute: function(data, next) {
        return lib.createRoute(data, next);        
    },

    updateRoute: function(data, next){
        return lib.updateRoute(data, next);
    },

    getRouteByid: function(routeid, next){
        return lib.getRouteByid(routeid, next);
    },

    getAllRoutes: function(data, next){
        return lib.getAllRoutes(data, next);
    },

    deleteRouteByid: function(routeid, next){
        return lib.deleteRouteByid(routeid, next);
    }
}