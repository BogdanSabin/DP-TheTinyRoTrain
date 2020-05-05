const api = require('./../../src/api/booking');

module.exports = {
    findSolution: function(req, next){
        let data = {
            StationStart: req.query.StationStart,
            StationEnd: req.query.StationEnd,
            numberOfTickets: req.query.numberOfTickets,
            wagonClass: req.query.wagonClass
        }
        return api.findSolution(data, next);
    },

    bookTicket: function(req, next){
        let data = {
            userid: req.params.userid,
            solution: req.body
        }
        return api.bookTicket(data, req.headers.authorization, next);
    },

    getTicketById: function(req, next){
        let ticketid = req.params.ticketid;
        return api.getTicketById(ticketid, req.headers.authorization, next);
    },
    
    getAllTicketsForUser: function(req, next){
        let data = {
            userid: req.params.userid,
            filter: req.body
        }
        return api.getAllTicketsForUser(data, req.headers.authorization, next);
    }
}