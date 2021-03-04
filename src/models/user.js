const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    name: String,
    email : String,
    password : {
        type: String,
        required: true,
        validate(value){
            if (value.length >10){
                throw new Error("Password should be less thant 5 characters ")
            }
        }
    }
})

const User = mongoose.model ('User', UserModel);

module.exports = User