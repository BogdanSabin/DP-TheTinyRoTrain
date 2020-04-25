const mongoose = require('mongoose');
const getConnection = require('./getConnection').getConnection;

var distanceSchema = mongoose.Schema({
    station1: mongoose.Types.ObjectId,
    station2: mongoose.Types.ObjectId,
    distance: Number
},{
    collection: 'distances'
});

mongoose.model('Distance',distanceSchema);

module.exports =function(){
    return getConnection('connection').model('Distance');
}