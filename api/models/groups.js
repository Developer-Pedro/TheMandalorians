const mongoose = require('mongoose');

const groupSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,//generates unique ID number for the group
    person: {type: mongoose.Schema.Types.ObjectId, ref:'Identification', require: true},
    messages: [{type: String,default: 1 , require: true}],
    quantity: {type: Number, default: 1},
    
});

module.exports = mongoose.model('Group',groupSchema);//refrence this schema throughout program by group


