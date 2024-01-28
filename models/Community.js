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
    
    // created_at: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updated_at: {
    //     type: Date
    // }
}, {timestamps: true});

// communitySchema.pre('save', function (next) {
//     this.update({}, { $set: { updated_at: new Date() } });
//     next();
// });

// communitySchema.pre('update', function (next) {
//     this.update({}, { $set: { updated_at: new Date() } });
//     next();
// });

const community = mongoose.model('Community', communitySchema);
module.exports = community;