const mongoose = require("mongoose");
var Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    },
    {timestamps: {createdAt: "createaAt", updatedAt: "updatedAt"}}
);

module.exports = mongoose.model('User', userSchema);