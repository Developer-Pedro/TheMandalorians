const mongoose = require('mongoose');

const groupSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    person: {type: mongoose.Schema.Types.ObjectId, ref:'Identification', require: true},
    quantity: {type: Number, default: 1}
});

module.exports = mongoose.model('Group',groupSchema);