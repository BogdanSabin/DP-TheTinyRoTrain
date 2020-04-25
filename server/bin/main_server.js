const config = require('./../config/config');
const connection = require('../config/dbconnect').connect(config.local.mongodb);
const express = require('express');
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');
const routes = require('./../routes');

connection.on('open', function(){
    console.log("Successfully connected to mongodb");
});

connection.on('error', function(error){
    console.log("Error when connecting to mongodb: " + error)
});

const app = express();

// server configuration
const port = config.local.server.main_server.port;
const hostname = config.local.server.main_server.hostname;

//app configuration
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//logger for requests
morganBody(app,
  {
    logReqUserAgent:false,
    logRequestBody:false,
    logResponseBody:false
  });


// add routes for  app
app.use('/api/authorization/user', routes.user);
app.use('/api/resource/station', routes.station);


// make the server listen to requests
app.listen(port, () => {
  console.log("Server running at: http://" + hostname + ":" + port);
});
