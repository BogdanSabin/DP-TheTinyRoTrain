const mongoose = require('mongoose');
const getConnection = require('./getConnection').getConnection;

var trainSchema = mongoose.Schema({
    name: String,
    route: { type: mongoose.Types.ObjectId, ref: 'Route' },
    wagons: [String]
},{
    collection: 'trains'
});

mongoose.model('Train',trainSchema);

module.exports =function(){
    return getConnection('connection').model('Train');
}