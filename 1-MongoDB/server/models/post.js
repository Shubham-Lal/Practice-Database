const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
    text: {
        type: String,
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Post", postSchema);