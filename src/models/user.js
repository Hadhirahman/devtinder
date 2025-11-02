const mongoose = require("mongoose")
const validate = require("validator")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

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

userschema.methods.getJWT =async function() {
    const user = this;
const token=await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return token
}



userschema.methods.validatePassword = async function (password) {
    const user = this;
   const isMatch = await bcrypt.compare(password, user.password);
   return isMatch;
}

module.exports = mongoose.model("User", userschema)

