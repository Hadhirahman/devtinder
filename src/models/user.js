const mongoose = require("mongoose")

const userschema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 30

    },
    lastName: {
        type: String
    },
    age: {
        type: Number,
        min: 18
    },
    emailId: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        trim: true

    }
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userschema)

