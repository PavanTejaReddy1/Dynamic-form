const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    phoneNumber : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String, 
        required : true
    },
    forms : []
}, {timestamps : true});

const User = mongoose.model("users", userSchema);

module.exports = { User };