const mongoose = require('mongoose');
const getConnection = require('./getConnection').getConnection;

var wagonSchema = mongoose.Schema({
    name: String,
    freeSeatsNo: number,
    totalSeatsNo: number,
    class: String,
    price: number,
    seats: [Boolean]
},{
    collection: 'wagons'
});

mongoose.model('Wagon',wagonSchema);

module.exports =function(){
    return getConnection('connection').model('Wagon');
}