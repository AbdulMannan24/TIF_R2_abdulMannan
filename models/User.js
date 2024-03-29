const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    }, 
    name: { 
        type: String,
        required: true,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 

}, {timestamps: true});

const user = mongoose.model('user', userSchema);
module.exports = user;