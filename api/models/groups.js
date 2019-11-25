const mongoose = require('mongoose');

const groupSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,//generates unique ID number for the group
    person: {type: mongoose.Schema.Types.ObjectId, ref:'Identification', require: true},
    message1:{type: String, required: false },
    message2:{type: String, required: false},
    message3:{type: String, required: false},
    message4:{type: String, required: false},
    message5:{type: String, required: false},
    message6:{type: String, required: false},
    message7:{type: String, required: false},
    message8:{type: String, required: false},
    message9:{type: String, required: false},
    message10:{type: String, required: false},
    message11:{type: String, required: false},
    message12:{type: String, required: false},
    message13:{type: String, required: false},
    message14:{type: String, required: false},
    message15:{type: String, required: false},
    message16:{type: String, required: false},
    message17:{type: String, required: false},
    message18:{type: String, required: false},
    message19:{type: String, required: false},
    message20:{type: String, required: false},
    quantity: {type: Number, default: 1}
});

module.exports = mongoose.model('Group',groupSchema);//refrence this schema throughout program by group