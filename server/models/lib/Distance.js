const mongoose = require('mongoose');
const getConnection = require('./getConnection').getConnection;

var distanceSchema = mongoose.Schema({
    station1: { type: mongoose.Types.ObjectId, ref: 'Station' },
    station2: { type: mongoose.Types.ObjectId, ref: 'Station'},
    distance: Number
},{
    collection: 'distances'
});

mongoose.model('Distance',distanceSchema);

module.exports =function(){
    return getConnection('connection').model('Distance');
}