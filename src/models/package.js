const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const packageModel = new Schema({
    name: String,
    type : String,
   
})

const Package = mongoose.model ('Package', packageModel);

module.exports =Package;