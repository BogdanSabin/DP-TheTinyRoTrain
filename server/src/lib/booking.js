const _ = require('lodash');
const distance = require('google-distance');
const config = require('./../../config/config');
const Model = require('./../../models').Ticket();
const ModelWagon = require('./../../models').Wagon();
const ModelTrain = require('./../../models').Train();
const ModelRoute = require('./../../models').Route();
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
    let solutions = [];
    ModelRoute.find({ "$and": [ 
        { "stations.name": data.stationStart },
        { "stations.name": data.stationEnd } 
    ]})
        .then(function(routes){
            return getRoutesByDate(data.departureData, routes, data.stationStart )
        })
        .then(function(filtredRoutes){
            let finalRoutes = filtredRoutes;
            
            return getTrainsByRoutes(finalRoutes)
        })
        .then(function(trains){
            return filterByWagons(trains, data.wagonClass, data.numberOfTickets)
        })
        .then(function(results){
           solutions = results;
            
           return getDistance(data.stationStart, data.stationEnd)
        })
        .then(function(distance){
            solutions.forEach(f =>{
                f.distance = distance;
                f.class = data.wagonClass;
                f.departureData = data.departureData;
                f.price = (distance * pricekm) + f.priceW;
            })
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            console.log(solutions);
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
            
            return next(null, solutions);
        })
        .catch(function(reason){
            console.log("Error search: " + reason);
            return next(null, reason);
        });
}

function getRoutesByDate(date, routes, s1){
    let filteredRoutes = []
    routes.forEach(r => {
        r.stations.forEach( s =>{
            if(s.name == s1 && compareDate(new Date(s.arrival),new Date(date))){
                filteredRoutes.push(r);
                return;
            }    
        })
    });
    return filteredRoutes;
}

function getTrainsByRoutes(routes){
    return Promise.all(routes.map(r => { 
        return ModelTrain.find({route: r._id})
        .populate('wagons')
        .populate('route', 'name -_id')
        .exec()
        .then((train) => { 
            return train;
        });
    }))
    .then(function(trains){  
        return trains
    })
}

function filterByWagons(trains, type, seats){
    let filtredTrains = []
    trains.forEach(t => {
        let found = false;
         t[0].wagons.forEach(w =>{
                if(w.freeSeatsNo >= seats && w.type === type && !found){
                    let reservedSeats = [];
                    let c = seats;
                    w.seats.forEach((s, i) =>{
                        if(s && c > 0) {
                            c--;
                            reservedSeats.push(w.name + '_S' + (i +1));
                        }
                    });
                    filtredTrains.push({
                        trainName: t[0].name,
                        trainId: t[0]._id,
                        wagonName: w.name,
                        wagonId: w._id,
                        seats: reservedSeats,
                        route: t[0].route.name,
                        priceW: w.price
                    });
                    found = true;
                }
            });
    });
    return filtredTrains;
}

function compareDate(d1, d2){
var month1 = d1.getUTCMonth() + 1; 
var day1 = d1.getUTCDate();
var year1 = d1.getUTCFullYear();

var month2 = d2.getUTCMonth() + 1; 
var day2 = d2.getUTCDate();
var year2 = d2.getUTCFullYear();

if(month1 == month2 && day1 == day2 && year1 == year2 )
    return true;
else
    return false;

}

function getDistance(origin, destination){
   return new Promise((resolve, reject) =>{
        distance.get(
            {
            origin: origin,
            destination: destination
            },
            function(err, data) {
            if (err){ 
                console.log(typeof origin);
                console.log(typeof destination);
                console.log(origin);
                console.log(destination);
                
                return reject(error);
            }
            else{
                let dist = parseInt(data.distance.split(' ')[0])
                return resolve(dist)
            }
        });
    });     
}

module.exports.populate = function(docs, next){
    if(_.isArray(docs)){
        Model.find({})
        .populate('train', 'name -_id')
        .populate('wagon', 'name -_id')
        .exec(function(error, data){
            if(error)
                return next(error);
            else{
                data.forEach(d =>{
                    d.train = d.train.name;
                    d.wagon = d.wagon.name;
                });
                return next(null, data);
            }
        })
    }
    else 
        return next(null, docs);
}
