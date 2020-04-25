const mongoose = require('mongoose');
const getConnection = require('./getConnection').getConnection;

var linkSchema = mongoose.Schema({
    route1: mongoose.Types.ObjectId,
    route2: mongoose.Types.ObjectId,
    station: mongoose.Types.ObjectId
},{
    collection: 'links'
});

mongoose.model('Link',linkSchema);

module.exports =function(){
    return getConnection('connection').model('Link');
}