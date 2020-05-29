const api = require('./../../src/api/booking');

module.exports = {
    findSolution: function(req, next){
        let data = {
            stationStart: req.body.stationStart,
            stationEnd: req.body.stationEnd,
            numberOfTickets: parseInt(req.body.numberOfTickets,10),
            wagonClass: req.body.wagonClass,
            departureData:  new Date(req.body.departureData)
        }
        console.log(req.body.departureData)
        console.log("Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(data);
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