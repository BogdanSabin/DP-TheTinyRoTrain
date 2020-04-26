const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var connectionCache = {}

module.exports.connect = function(dbConfig, connectionName){
    connectionName = connectionName || 'connection';

    const connection = mongoose.createConnection(dbConfig,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    connection.on('error', function(error){
        console.log("Error while connecting to mongo " + dbConfig + error);
    }); 

    connectionCache[connectionName] = connection;

    return connection;
}

module.exports.getConnectionByName = function(connectionName){
    if(!connectionCache['connection'])
        console.log("Model connection failed!");
    return connectionCache[connectionName] || connectionCache['connection'];
}