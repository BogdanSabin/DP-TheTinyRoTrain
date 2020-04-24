const mongoose = require('mongoose');
const getConnection = require('./getConnection').getConnection;

const roles = ['user', 'admin', 'master'];

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    role: {type: String, enum: roles, "default": roles[0]}
},{
    collection: 'users'
});

mongoose.model('User', userSchema);

module.exports = function(){
    return getConnection('connection').model('User');
}