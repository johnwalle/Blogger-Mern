const { Schema, model } = require("mongoose");

const postSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = model("Post", postSchema);