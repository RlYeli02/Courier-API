const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageModel = new Schema({
    name: String,
    typeOF : String,
    owner : {type: Schema.Types.ObjectId, ref: 'User'}
})

const Package = mongoose.model ('Package', packageModel);

module.exports =Package;