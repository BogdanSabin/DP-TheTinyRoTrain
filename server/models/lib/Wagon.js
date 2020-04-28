const mongoose = require('mongoose');
const getConnection = require('./getConnection').getConnection;

var wagonSchema = mongoose.Schema({
    name: String,
    freeSeatsNo: Number,
    totalSeatsNo: Number,
    class: String,
    price: Number,
    seats: [Boolean],
    isAttached: Boolean
},{
    collection: 'wagons'
});

mongoose.model('Wagon',wagonSchema);

module.exports =function(){
    return getConnection('connection').model('Wagon');
}