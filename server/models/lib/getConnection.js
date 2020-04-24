const mongoose = require('mongoose');
const dbconn = require('../../config/dbconnect');

module.exports.getConnection = function(connectionName){
    const conn = dbconn.getConnectionByName(connectionName);
    
    return conn || mongoose;
}