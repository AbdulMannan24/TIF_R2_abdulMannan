const mongoose = require('mongoose');

const communitySchema = mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true
    }
   
}, {timestamps: true});


const community = mongoose.model('Community', communitySchema);
module.exports = community;