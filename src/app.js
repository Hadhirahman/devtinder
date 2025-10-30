const express = require("express");
const app = express();
const connectDB = require("./config/database")
const { adminAuth } = require("../src/middlewares/auth")
const port = 9526;
const dotenv = require("dotenv")
const { validationSignUp } = require("./utils/validation")
dotenv.config()
const bcrypt = require("bcrypt")

const User = require("./models/user")
app.use(express.json());

app.post("/signup", async (req, res) => {
    try {

        validationSignUp(req)
        if (!validationSignUp(req).valid) {
            return res.status(400).json({ errors: validationSignUp(req).errors });
        }

        const { firstName,lastname,age,emailId, password } = req.body

        const hashedpass = await bcrypt.hash(password, 15)
        console.log(hashedpass);
        
        const user = new User({
            firstName:firstName,
            lastName:lastname,
            age:age,
            emailId:emailId,
            password:hashedpass
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


app.post("/login", async (req, res) => {
    const { emailId, password } = req.body
    try {
        const user = await User.findOne({ emailId: emailId })

        if (!user) {
            throw new Error("user not found in db")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error("invalid credentials")
        }
        res.send("login success")
    } catch (err) {
        res.status(500).send("something went wrong "+ err.message)
    }
})

app.get("/feed", async (req, res) => {
    const userEmail = req.body.emailId
    try {
        const user = await User.find({})
        if (user.length === 0) {
            res.status(402).send("user not found in db")
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(500).send("something went wrong")
    }
})

connectDB().
    then(() => {
        console.log("db connected success fully");
        app.listen(process.env.PORT, () => {
            console.log("server has running now");
        })
    })
    .catch((err) => {
        console.error("db not connected")
    })
