const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    name: {
        type: String,
        required:true,
        unique: true
    },
    email : String,
    password : {
        type: String,
        required: true,
         
        
     }
})

const User = mongoose.model ('User', UserModel);

module.exports = User