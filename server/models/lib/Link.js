const mongoose = require('mongoose');
const getConnection = require('./getConnection').getConnection;

var linkSchema = mongoose.Schema({
    route1: { type: mongoose.Types.ObjectId, ref: 'Route' },
    route2: { type: mongoose.Types.ObjectId, ref: 'Route' },
    station: { type: mongoose.Types.ObjectId, ref: 'Station' }
},{
    collection: 'links'
});

mongoose.model('Link',linkSchema);

module.exports =function(){
    return getConnection('connection').model('Link');
}