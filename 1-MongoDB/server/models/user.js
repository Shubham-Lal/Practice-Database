const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        text: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        text: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    }
});

module.exports = mongoose.model("User", userSchema);