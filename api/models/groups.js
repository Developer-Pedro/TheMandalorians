const mongoose = require('mongoose');

const groupSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: mongoose.Schema.Types.ObjectId, ref:'ID', require: true},
    quantity: {type: Number, default: 1}
});

module.exports = mongoose.model('Group',groupSchema);