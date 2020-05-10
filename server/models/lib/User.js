const mongoose = require('mongoose');
const getConnection = require('./getConnection').getConnection;

const roles = ['user', 'admin', 'master'];

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    role: {type: String, enum: roles, "default": roles[0]},
    emailConfirmation: {type: Boolean, "default": false}
},{
    collection: 'users'
});

userSchema.statics.getRoles = function(next) {
    return next(null, roles);
  };

userSchema.virtual('fullname').get(function() {
    return this.firstName + ' ' + this.lastName;
});

mongoose.model('User', userSchema);

module.exports = function(){
    return getConnection('connection').model('User');
}