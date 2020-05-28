const _ = require('lodash');
const distance = require('google-distance');
const config = require('./../../config/config');
const Model = require('./../../models').Ticket();
const ModelWagon = require('./../../models').Wagon();
const ModelTrain = require('./../../models').Train();
const serverErrors = require('./error');

distance.apiKey = config.local.google.apiKey;
const pricekm = 5.7;

module.exports.TicketModel = Model;

module.exports.resposeFilter = function(data, next){
    if(_.isArray(data))
        return next(null, data.map(r => {
            return {
                _id: r._id,
                train: r.train,
                wagon: r.wagon,
                class: r.class,
                seats: r.seat,
                departureDate: r.departureDate,
                arrivalDate: r.arrivalDate,
                price: r.price,
                customer: r.customer
            }
        }));
    else
    return next(null, _.pick(data, 
        ['_id', 'train', 'wagon', 'class', 'seats', 'departureDate','arrivalDate','price', 'customer']))
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

function getPrice(origin, destination, next){
    distance.get(
        {
          origin: origin,
          destination: destination
        },
        function(err, data) {
          if (err) 
            return next(error)
          else{
              let dist = parseInt(data.distance.split(' ')[0])
              return next(null, dist * pricekm)
          }
      });
      
}