const config = require('../config/config');
const connection = require('../config/dbconnect').connect(config.local.mongodb);
const UserModel = require('../models').User();

connection.on('open', function(){
    console.log("Connected ok to mongodb");
});

connection.on('error', function(error){
    console.log("Error when connecting: " + error)
});

console.log(UserModel);

const user = new UserModel({ firstName: 'asd', lastName: 'sda', email: 'ads', phone: 'dsa' });
user.save().then(()=>{console.log("Saved!"); process.exit(0)});

UserModel.findOne({firstName:'asd'}, function(error, data){
    console.log(data);
})