const _ = require('lodash');
const mongoose = require('mongoose');
const Model = require('./../../models').Station();

var stations = [];

users.push(_.extend({},{
    _id: mongoose.Types.ObjectId("100000000000000000000000"),
    name: 'TimisoaraNord',
    timeToWait: 10
}));

users.push(_.extend({},{
    _id: mongoose.Types.ObjectId("100000000000000000000002"),
    name: 'TimisoaraSud',
    timeToWait: 1
}));

module.exports.Model = Model;
module.exports.data = stations;