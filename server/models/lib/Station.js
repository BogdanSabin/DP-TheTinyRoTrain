const mongoose = require('mongoose');
const getConnection = require('./getConnection').getConnection;

var stationSchema = mongoose.Schema({
    name: String,
    timeToWait: Number
},{
    collection: 'stations'
});

mongoose.model('Station', stationSchema);

module.exports = function(){
    return getConnection('connection').model('Station');
}