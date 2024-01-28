const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    community: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true  
    },

}, {timestamps: true});

const member = mongoose.model('Member', memberSchema);
module.exports = member;