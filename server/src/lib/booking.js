const _ = require('lodash');
const Model = require('./../../models').Ticket();
const ModelWagon = require('./../../models').Wagon();
const ModelTrain = require('./../../models').Train();
const serverErrors = require('./error');

module.exports.TicketModel = Model;

module.exports.resposeFilter = function(data, next){
    if(_.isArray(data))
        return next(null, data.map(r => {
            return {
                _id: r._id,
                train: r.train,
                wagon: r.wagon,
                class: r.class,
                seat: r.seat,
                departureDate: r.departureDate,
                arrivalDate: r.arrivalDate,
                price: r.price,
                customer: r.customer
            }
        }));
    else
    return next(null, _.pick(data, 
        ['_id', 'train', 'wagon', 'class', 'seat', 'departureDate','arrivalDate','price', 'customer']))
}
module.exports.transormData = function(data, next){
    let ticket = data.solution;
    ticket.customer = data.userid;
    return next(null, ticket);
}

module.exports.createFilter = function(data){
    return { 
        seats: data.seats, 
        train: data.train, 
        wagon: data.wagon,
        class:  data.class,
        departureDate:  data.departureDate,
        arrivalDate:  data.arrivalDate,
        price:  data.price,
        customer:  data.customer 
     }
}

module.exports.getAllFilter = function(data){
    return { customer: data }; 
}

module.exports.findSolution = function(data, next){

}