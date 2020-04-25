const mongoose = require('mongoose');
const getConnection = require('./getConnection').getConnection;

var routeSchema = mongoose.Schema({
    name: String,
    departureDate: Date,
    arrivalDate: Date,
    stations: [Object]
},{
    collection: 'routes'
});

mongoose.model('Route',routeSchema);

module.exports =function(){
    return getConnection('connection').model('Route');
}