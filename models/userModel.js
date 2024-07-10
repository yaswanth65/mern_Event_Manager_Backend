const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        unique: true
    },
    note: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
