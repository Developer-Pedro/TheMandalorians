const mongoose = require('mongoose');

const IDM_Schema = mongoose.Schema({
    _IDM: mongoose.Schema.Types.ObjectId,
    fname:String,
    lname:String
});

module.exports = mongoose.model('IDM',IDM_Schema);