const express = require('express');
const authRouter = express.Router();
const bcrypt=require("bcrypt")
const { validationSignUp } = require("../utils/validation")
const User=require("../models/user")


authRouter.post("/signup", async (req, res) => {
    
    
    try {

        validationSignUp(req)
        if (!validationSignUp(req).valid) {
            return res.status(400).json({ errors: validationSignUp(req).errors });
        }

        const { firstName, lastname, age, emailId, password } = req.body

        const hashedpass = await bcrypt.hash(password, 15)

        const user = new User({
            firstName: firstName,
            lastName: lastname,
            age: age,
            emailId: emailId,
            password: hashedpass
        })
        await user.save()
        res.send("user added successfully")
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.emailId) {
            return res.status(400).json({
                success: false,
                message: "Email already exists. Please use a different email address.",
            });
        }
        res.status(500).json({ error: "Error creating user" + err.message });
    }

})

authRouter.post("/login", async (req, res) => {
    const { emailId, password } = req.body
    
    
    try {
    
        const user = await User.findOne({ emailId: emailId })

        if (!user) {
            throw new Error("user not found in db")
        }
        const isMatch = await user.validatePassword(password)
        if (!isMatch) {
            throw new Error("invalid credentials")
        } else {
            const token = await user.getJWT()
            res.cookie("token", token, { expires: new Date(Date.now() + 3600000), httpOnly: true })
            res.send("login success")
        }
    } catch (err) {
        res.status(500).send("something went wrong " + err.message)
    }
})


module.exports = authRouter;