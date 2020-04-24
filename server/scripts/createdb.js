const _ = require('lodash');
const Promise = require('bluebird');
const reqDir = require('require-dir');

const config = require('../config/config');
const connection = require('../config/dbconnect').connect(config.local.mongodb);

connection.on('open', function(){
    console.log("Connected to mongodb");
});

connection.on('error', function(error){
    console.log("Error when connecting to mongodb: " + error)
});

let createdb = function(){
    let objects = reqDir('./../seeds');
    let data = _.toArray(objects);
    return Promise.each(data, function(resource){
        if(!resource.Model || !resource.data)
            return;
        var Model = resource.Model;
        return Promise.each(resource.data, function(entry){
            var data = new Model(entry);
            return data.save().then(()=> {return;})
           
        })
    }).then(()=>{
        return "Done";
    }).catch(error => {
        return error;
    });
}

createdb().then(message => {
    console.log(message);
    process.exit(0);
});