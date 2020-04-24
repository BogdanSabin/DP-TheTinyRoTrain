const mongoose = require('mongoose');
const getConnection = require('./getConnection').getConnection;

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String
},{
    collection: 'users'
});

mongoose.model('User', userSchema);

module.exports = function(){
    return getConnection('connection').model('User');
}