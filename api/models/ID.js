const mongoose = require('mongoose');


//Defining the layout of the actual product 
const IDSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //basic format for constructing model
    fname: { type: String, required: true },//use to get name out onto the screen
    lname: { type: String, required: true },//use to gey last name 
    //email: { type: String, required: true },//used to get email
    club: { type: String, required: true},//used to pull IDs into group
    IDImage: { type: String, required: true } //used to aquire profile picture 

});

module.exports = mongoose.model('Identification',IDSchema);