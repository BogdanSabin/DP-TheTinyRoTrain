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
    attachedTo: { type: mongoose.Types.ObjectId, ref: 'Train' }
},{
    collection: 'wagons'
});

wagonSchema.statics.getTypes = function(next) {
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

wagonSchema.pre("save",function(next) {
    if (this.totalSeatsNo <= 0)
        console.log("Invalid seats number " + this.totalSeatsNo);
    else {
        if(this.seats.length === 0){
            this.freeSeatsNo = this.totalSeatsNo;
            for(let i = 0; i < this.totalSeatsNo; i++)
                 this.seats.push(true);
        }
    }
    next();
});

mongoose.model('Wagon',wagonSchema);

module.exports =function(){
    return getConnection('connection').model('Wagon');
}