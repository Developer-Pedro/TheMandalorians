const mongoose = require('mongoose');


//Defining the layout of the actual product 
const IDSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fname: { type: String, required: true },
    lname: { type: String, required: true }
    //productImage: { type: String, required: true }
});

module.exports = mongoose.model('Identification',IDSchema);