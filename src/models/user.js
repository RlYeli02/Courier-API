const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    name: String,
    email : String,
    password : String,
})

const User = mongoose.model ('User', UserModel);

module.exports = User