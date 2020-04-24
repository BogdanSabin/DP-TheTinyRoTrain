const _ = require('lodash');
const mongoose = require('mongoose');
const Model = require('./../../models').User();

var users = [];

users.push(_.extend({},{
    _id: mongoose.Types.ObjectId("101010101010101010101010"),
    firstName: 'master',
    lastName: 'master',
    email: 'maste@email.ro',
    role: 'master'
}));


module.exports.Model = Model;
module.exports.data = users;