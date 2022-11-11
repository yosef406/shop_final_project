const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String
    },
    street: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },

});

module.exports = mongoose.model('users', UserSchema);