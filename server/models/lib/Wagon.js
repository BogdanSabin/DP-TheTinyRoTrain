const mongoose = require('mongoose');
const getConnection = require('./getConnection').getConnection;

const types = ['class I', 'class II', 'chuset', 'restaurant'];

var wagonSchema = mongoose.Schema({
    name: String,
    freeSeatsNo: {type: Number, "default": 0},
    totalSeatsNo: Number,
    type: {type: String, enum: types, "default": types[0]},
    price: Number,
    seats: [Boolean],
    isAttached: {type: Boolean, "default":false}
},{
    collection: 'wagons'
});

wagonSchema.statics.gettypes = function(next) {
    return next(null, types);
};

wagonSchema.statics.getPriceByType = function(type) {
    switch(type){
        case 'class I' : return 15;
        case 'class II': return 10;
        case 'chuset' : return 5;
        case 'restaurant': return 20;
        default: return 0;
    }
};

wagonSchema.statics.isDefaultType = function(type) {
    return types.includes(type)
};


mongoose.model('Wagon',wagonSchema);

module.exports =function(){
    return getConnection('connection').model('Wagon');
}