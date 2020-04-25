const mongoose = require('mongoose');
const getConnection = require('./getConnection').getConnection;

var trainSchema = mongoose.Schema({
    name: String,
    route: mongoose.Types.ObjectId,
    wagons: [mongoose.Types.ObjectId]
},{
    collection: 'trains'
});

mongoose.model('Train',trainSchema);

module.exports =function(){
    return getConnection('connection').model('Train');
}