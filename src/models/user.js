const mongoose = require('mongoose');

const UserModel = mongoose.Schema({
    nombre: string,
    email : string,
    password : string
})

const User = mongoose.model ('User', UserModel);

module.exports = User