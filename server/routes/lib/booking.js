const router = require('express').Router();
const middlewate = require('./../../middleware').booking;
const helper = require('./helper');

router.get('/find/solution', (req, res) =>{
    middlewate.findSolution(req, function(error, serverRes){
        helper.respond(res, error, serverRes);
    });
});

router.post('/book/ticket/:userid', (req, res) =>{
    middlewate.bookTicket(req, function(error, serverRes){
        helper.redirect(res, error, serverRes);
    });
});

router.get('/ticket/:ticketid', (req, res) =>{
    middlewate.getTicketById(req, function(error, serverRes){
        helper.redirect(res, error, serverRes);
    });
});

router.get('/ticket/all/:userid', (req, res) =>{
    middlewate.getAllTicketsForUser(req, function(error, serverRes){
        helper.redirect(res, error, serverRes);
    });
});

module.exports = router;