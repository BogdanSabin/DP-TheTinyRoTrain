const lib = require('./../lib/booking');
const helper = require('./../lib/helper');
const authorize = require('./../authorizator/autz').authorize;

module.exports = {
    
    findSolution: function(data, next){
        return lib;
    },

    bookTicket: function(data, token, next){
        return authorize(token, 'user', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
            return helper.createResource({
                data: data,
                Model: lib.TicketModel,
                createFilter: lib.createFilter(data.solution),
                transformData: lib.transormData,
                responseFilter: lib.resposeFilter
            }, next);
        });
    },

    getTicketById: function(ticketid, token, next){
        return authorize(token, 'user', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
            return helper.getResourceByid({
                id: ticketid,
                Model: lib.TicketModel,
                responseFilter: lib.resposeFilter
            },next);
        });
    },
    
    getAllTicketsForUser: function(data, token, next){
        return authorize(token, 'user', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
            return helper.getAllResources({
                Model: lib.wagonModel,
                getAllFilter: lib.getAllFilter(data.userid),
                responseFilter: lib.resposeFilter
            }, next);
        });
    }
}