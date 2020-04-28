const mongoose = require('mongoose');
const getConnection = require('./getConnection').getConnection;

var ticketSchema = mongoose.Schema({
    train: { type: mongoose.Types.ObjectId, ref: 'Train' },
    wagon: { type : mongoose.Types.ObjectId, ref: 'Wagon' },
    class: String,
    seat: String,
    departureDate: Date,
    arrivalDate: Date,
    price: Number,
    customer: { type: mongoose.Types.ObjectId, ref: 'User' } 
},{
    collection: 'trains'
});

mongoose.model('Ticket',ticketSchema);

module.exports = function(){
    return getConnection('connection').model('Ticket');
}