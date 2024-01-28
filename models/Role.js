const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    }, 
    name: { 
        type: String,
        required: true
    },
    
}, {timestamps: true});

roleSchema.pre('update', function (next) {
    this.update({}, { $set: { updated_at: new Date() } });
    next();
});

const role = mongoose.model('role', roleSchema);
module.exports = role;