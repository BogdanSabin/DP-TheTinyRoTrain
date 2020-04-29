const _ = require('lodash');
const mongoose = require('mongoose');
const crypter = require('./../src/crypter');
const Model = require('./../models').User();

var users = [];

users.push(_.extend({},{
    _id: mongoose.Types.ObjectId("101010101010101010101010"),
    firstName: 'master',
    lastName: 'master',
    email: 'master@email.ro',
    role: 'master',
    emailConfirmation: true,
    password: crypter.encrypt('password')
}));


module.exports.Model = Model;
module.exports.data = users;