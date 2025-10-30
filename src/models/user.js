const mongoose = require("mongoose")
const validate = require("validator")

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
        trim: true,
        validate:(value)=>{
            return validate.isEmail(value);
        }

    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 150,
        validate: {
            validator: function (value) {
                return validate.isStrongPassword(value);
            }
        }
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("User", userschema)

