const express = require("express");
const app = express();
const connectDB = require("./config/database")
const dotenv = require("dotenv")
dotenv.config()
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
const User = require("./models/user")





const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
// const requistRouter = require("./router/requist");

app.use("/auth", authRouter);
app.use("/user", profileRouter);
// app.use("/requist", requistRouter);



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
