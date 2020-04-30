const _ = require('lodash');
const mongoose = require('mongoose');
const Model = require('./../models').Station();

var stations = [];

stations.push(_.extend({},{
    _id: mongoose.Types.ObjectId("5ebb8149bb1561111b899b97"),
    name: 'TimisoaraNord',
    timeToWait: 10
}));

stations.push(_.extend({},{
    _id: mongoose.Types.ObjectId("5ebb8149bb1561111b888b97"),
    name: 'TimisoaraSud',
    timeToWait: 1
}));

module.exports.Model = Model;
module.exports.data = stations;