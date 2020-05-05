const lib = require('./../lib/booking');
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
                return lib;
        });
    },

    getTicketById: function(data, token, next){
        return authorize(token, 'user', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return lib;
        });
    },
    
    getAllTicketsForUser: function(data, token, next){
        return authorize(token, 'user', function (error, ok) {
            if(error)
                return next(error);
            if(ok)
                return lib;
        });
    }
}